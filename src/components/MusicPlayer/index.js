import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import style from './MusicPlayer.module.scss';
import {
    AlignLeftOutlined,
    HeartOutlined,
    PauseCircleOutlined,
    PlayCircleOutlined,
    RetweetOutlined,
    SoundOutlined,
    StepBackwardOutlined,
    StepForwardOutlined,
    SwapOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/store/actions';
import { Button, Col, Modal, Popover, Row, Slider, message } from 'antd';
import * as apis from '~/apis';
import ClickAbleText from '../ClickAbleText';
import PlaylistPopper from './PlaylistPopper';
import Scrollbars from 'react-custom-scrollbars-2';
import { doc, setDoc } from 'firebase/firestore';
import { usersRef } from '~/firebase';

const cx = classNames.bind(style);
var intervalID;
const MusicPlayer = () => {
    const dispatch = useDispatch();
    const { user, userData } = useSelector((state) => state.app);
    const { currentSongId, isPlaying, songs, isSearching } = useSelector((state) => state.curMusic);
    const [audio, setAudio] = useState(new Audio());
    const [songInfo, setSongInfo] = useState(null);
    const [sliderValue, setSliderValue] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [mute, setMute] = useState(false);
    const [volumeValue, setVolumeValue] = useState(100);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [songLyrics, setSongLyrics] = useState('');
    const [LyricsCheck, setLyricsCheck] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    function convertDuration(time) {
        return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
    }
    //modal lyrics
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const elementToScroll = useRef();

    const scrollToElement = () => {
        if (elementToScroll.current) {
            elementToScroll.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    useEffect(() => {
        let audioTimer = audio.currentTime * 1000;
        for (let i = 0; i < LyricsCheck?.length; i++) {
            if (audioTimer > LyricsCheck[i].startTime && audioTimer < LyricsCheck[i].endTime) {
                LyricsCheck[i].isRunning = true;
            } else {
                LyricsCheck[i].isRunning = false;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audio.currentTime]);

    useEffect(() => {
        const fetchSong = async () => {
            const [res1, res2, res3] = await Promise.all([
                apis.apiGetInfoSong(currentSongId),
                apis.apiGetSong(currentSongId),
                apis.apiGetSongLyrics(currentSongId),
            ]);
            if (res2.data.err === 0) {
                audio.pause();
                setAudio(new Audio(res2.data.data['128']));
                if (res1.data.err === 0) {
                    setSongInfo(res1.data.data);
                }
                if (res3.data.err === 0) {
                    setSongLyrics(res3.data.data.sentences);
                    const Lyrics = res3.data.data.sentences?.map((sentence) => {
                        return {
                            startTime: sentence?.words[0]?.startTime,
                            endTime: sentence?.words[sentence?.words.length - 1]?.endTime,
                            isRunning: false,
                        };
                    });
                    setLyricsCheck(Lyrics);
                }
            }
        };

        fetchSong();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSongId]);
    //play music when click a song
    useEffect(() => {
        if (isPlaying) {
            intervalID = setInterval(() => {
                let percent = Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
                setSliderValue(percent);
            }, 200);
        } else {
            clearInterval(intervalID);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);

    useEffect(() => {
        intervalID && clearInterval(intervalID);
        setSliderValue(0);
        audio.load();
        if (isPlaying) {
            audio.play();
            intervalID = setInterval(() => {
                let percent = Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
                setSliderValue(percent);
            }, 200);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audio]);
    //handleAutoPlayNextSong
    useEffect(() => {
        const handleEnded = () => {
            if (isRepeat) {
                audio.currentTime = 0;
                audio.play();
            } else if (isShuffle) {
                handleShuffle();
            } else {
                handleNextSong();
            }
        };

        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audio, isShuffle, isPlaying, isRepeat]);

    const handlePlayMusic = () => {
        if (songInfo) {
            if (isPlaying) {
                audio.pause();
                dispatch(actions.setPlay(false));
            } else {
                audio.play();
                dispatch(actions.setPlay(true));
            }
        }
    };

    const marks = {
        0: {
            style: {
                color: 'white',
            },
            label: songInfo ? convertDuration((sliderValue * songInfo?.duration) / 100) : '00:00',
        },
        100: {
            style: {
                color: 'white',
            },
            label: songInfo ? convertDuration(songInfo?.duration) : '00:00',
        },
    };

    const handleChangeDurationSong = (value) => {
        audio.currentTime = (value * songInfo?.duration) / 100;
        setSliderValue(value);
    };

    //handle button actions
    const handleNextSong = () => {
        if (songs) {
            if (isShuffle) {
                handleShuffle();
            } else {
                let currentSongIndex;
                songs?.forEach((song, index) => {
                    if (song?.encodeId === currentSongId) currentSongIndex = index;
                });

                if (currentSongIndex < songs.length - 1) {
                    dispatch(actions.setCurSongId(songs[currentSongIndex + 1]?.encodeId));
                }
            }
        }
    };

    const handlePrevSong = () => {
        if (songs) {
            if (isShuffle) {
                handleShuffle();
            } else {
                let currentSongIndex;
                songs?.forEach((song, index) => {
                    if (song?.encodeId === currentSongId) currentSongIndex = index;
                });

                if (currentSongIndex !== 0) {
                    dispatch(actions.setCurSongId(songs[currentSongIndex - 1]?.encodeId));
                }
            }
        }
    };

    const handleShuffle = () => {
        const randomIndex = Math.round(Math.random() * songs?.length) - 1;
        dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
    };

    const handleMuteVolume = () => {
        mute ? setVolumeValue(100) : setVolumeValue(0);
        setMute((prev) => !prev);
    };

    const handleChangeVolume = (value) => {
        setVolumeValue(value);
        if (value === 0) {
            setMute(true);
        } else {
            setMute(false);
        }
    };
    //change Volume Music
    useEffect(() => {
        audio.volume = volumeValue / 100;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [volumeValue]);

    //handle Keyboard
    useEffect(() => {
        //spacekey
        const handleKeyDown = (e) => {
            if (!isSearching) {
                if (e.code === 'Space') {
                    e.preventDefault();
                    if (songInfo) {
                        if (isPlaying) {
                            audio.pause();
                            dispatch(actions.setPlay(false));
                        } else {
                            audio.play();
                            dispatch(actions.setPlay(true));
                        }
                    }
                }
                if (e.code === 'ArrowLeft') {
                    audio.currentTime -= 5;
                }
                if (e.code === 'ArrowRight') {
                    audio.currentTime += 5;
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying, audio, isSearching]);

    //add favorite music
    const handleAddFavorite = () => {  
        if (userData?.songs.find(song => song?.encodeId === songInfo?.encodeId)) {
            messageApi.open({
                type: 'warning',
                content: 'This song is already in your playlist...',
              });
        } else {
            const newUserData = userData;
            newUserData?.songs.push(songInfo);
            setDoc(doc(usersRef, `${user?.uid}`), newUserData);
            dispatch(actions.setUserData(newUserData));
            messageApi.open({
                type: 'success',
                content: 'Added to your playlist!',
              });
        }
    }


    return (
        <div className={cx('wrapper')}>
            {contextHolder}
            <Row>
                <Col xs={0} sm={0} md={8} lg={8} xl={8}>
                    {songInfo ? (
                        <div className={cx('song-info')}>
                            <img
                                className={cx('song-img')}
                                src={songInfo?.thumbnail}
                                alt={songInfo?.title}
                            />

                            <div className={cx('info')}>
                                <strong>{songInfo?.title}</strong>
                                <div className={cx('artists-name')}>
                                    {songInfo?.artists.map((artist, index) => (
                                        <ClickAbleText dataArtist={artist} key={index}>
                                            {artist?.name}
                                        </ClickAbleText>
                                    ))}
                                </div>
                            </div>

                            <div className={cx('icons')}>
                                <HeartOutlined onClick={handleAddFavorite} className={cx('heart')}/>
                            </div>
                        </div>
                    ) : (
                        <h2>Let's pick a song!</h2>
                    )}
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <div className={cx('song-player')}>
                        <div className={cx('actions')}>
                            <SwapOutlined
                                className={cx('action-btn', { shuffle: isShuffle })}
                                onClick={() => {
                                    setIsShuffle((prev) => !prev);
                                }}
                            />
                            <StepBackwardOutlined
                                className={songs ? cx('action-btn') : cx('action-btn-disable')}
                                onClick={handlePrevSong}
                            />
                            <div onClick={handlePlayMusic}>
                                {isPlaying ? (
                                    <PauseCircleOutlined className={cx('action-btn', 'play-btn')} />
                                ) : (
                                    <PlayCircleOutlined className={cx('action-btn', 'play-btn')} />
                                )}
                            </div>
                            <StepForwardOutlined
                                className={songs ? cx('action-btn') : cx('action-btn-disable')}
                                onClick={handleNextSong}
                            />
                            <RetweetOutlined
                                className={cx('action-btn', { repeat: isRepeat })}
                                onClick={() => {
                                    setIsRepeat((prev) => !prev);
                                }}
                            />
                        </div>
                        <div className={cx('slide-bar')}>
                            <Slider
                                dots={false}
                                tooltip={{ open: false }}
                                value={sliderValue}
                                marks={marks}
                                railStyle={{ backgroundColor: 'gray' }}
                                onChange={(value) => handleChangeDurationSong(value)}
                            />
                        </div>
                    </div>
                </Col>
                <Col xs={0} sm={0} md={8} lg={8} xl={8}>
                    <div className={cx('song-settings')}>
                        <AlignLeftOutlined className={cx('setting-btn')} onClick={showModal} />

                        <Modal
                            title={`Lyrics: ${songInfo?.title}`}
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={null}
                            centered
                            width={1000}
                        >
                            <div className={cx('lyrics-container')}>
                                <div>
                                    <img src={songInfo?.thumbnailM} alt="" />

                                    <Button className={cx('scroll-btn')} type='primary' onClick={scrollToElement}>Scroll to running lyric</Button>
                                </div>

                                <div className={cx('lyrics-wrapper')}>
                                    <Scrollbars
                                        style={{ width: '100%' }}
                                        autoHeight
                                        autoHeightMin={100}
                                        autoHeightMax={500}
                                    >
                                        {songLyrics ? (
                                            songLyrics.map((sentence, index) => (
                                                <div
                                                    className={cx({
                                                        lyricSentence: LyricsCheck[index].isRunning,
                                                    })}
                                                    ref={LyricsCheck[index].isRunning ? elementToScroll : null}
                                                    key={index}
                                                >
                                                    {sentence?.words.map((word, index) => (
                                                        <span
                                                            className={cx('lyrics-word')}
                                                            key={index}
                                                        >
                                                            {word?.data}
                                                        </span>
                                                    ))}
                                                </div>
                                            ))
                                        ) : (
                                            <h2>There's no lyrics for this song</h2>
                                        )}
                                    </Scrollbars>
                                </div>
                            </div>
                        </Modal>

                        <div className={cx('volume-wrapper')}>
                            <SoundOutlined
                                className={cx('volume-btn', { mute: mute })}
                                onClick={handleMuteVolume}
                            />
                            <Slider
                                className={cx('volume-slider')}
                                value={volumeValue}
                                railStyle={{ backgroundColor: 'gray' }}
                                onChange={handleChangeVolume}
                            />
                        </div>

                        <Popover
                            content={<PlaylistPopper />}
                            trigger="click"
                            arrow={false}
                            color="#34224f"
                            overlayInnerStyle={{ padding: '6px', marginBottom: '12px' }}
                            placement="topLeft"
                        >
                            {songs ? <UnorderedListOutlined className={cx('list-btn')} /> : <></>}
                        </Popover>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default MusicPlayer;
