import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/store/actions';
import { Line } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import { Chart } from 'chart.js/auto';
import classNames from 'classnames/bind';
import style from './ZingChart.module.scss';
import { isEqual } from 'lodash';
import DisplayedSong from './DisplayedSong';
import Top100 from '~/components/Top100';
import WeekChart from '~/components/WeekChart';
import LoadingScreen from '~/components/LoadingScreen';

const cx = classNames.bind(style);

const ZingChart = () => {
    const dispatch = useDispatch();
    const [dataChart, setDataChart] = useState(null);
    const [songInfo, setSongInfo] = useState(null);
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    });
    const [selected, setSelected] = useState(null);
    const chartRef = useRef();
    const { chart, topSongs, chartHome, isLoading } = useSelector((state) => state.app);
    useEffect(() => {
        if (chartHome?.RTChart?.items) {
            dispatch(actions.setLoading(false));
        } else {
            dispatch(actions.setLoading(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartHome?.RTChart?.items]);

    useEffect(() => {
        var songDisplayed = topSongs.find((song) => song?.encodeId === selected);
        setSongInfo(songDisplayed);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);
    const options = {
        responsive: true,
        pointRadius: 0,
        aspectRatio: 0,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'gray', drawTicks: false },
                min: dataChart?.RTChart?.chart?.minScore,
                max: dataChart?.RTChart?.chart?.maxScore,
                border: { dash: [3, 3] },
            },
            x: {
                ticks: { color: 'gray' },
                grid: { color: 'transparent' },
            },
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({ tooltip }) => {
                    if (!chartRef || !chartRef.current) return;
                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0)
                            setTooltipState((prev) => ({ ...prev, opacity: 0 }));
                        return;
                    }
                    const counters = [];
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            data: chart?.items[Object.keys(chart?.items)[i]]
                                ?.filter((item) => +item.hour % 2 === 0)
                                ?.map((item) => item.counter),
                            encodeId: Object.keys(chart?.items)[i],
                        });
                    }
                    const result = counters.find((item) =>
                        item.data.some(
                            (counter) => counter === +tooltip.body[0]?.lines[0]?.replace('.', ''),
                        ),
                    );
                    setSelected(result.encodeId);
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY,
                    };
                    if (!isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData);
                },
            },
        },
        hover: {
            mode: 'dataset',
            intersect: false,
        },
    };
    useEffect(() => {
        const labels = chart?.times
            ?.filter((item) => +item.hour % 2 === 0)
            ?.map((item) => `${item.hour}:00`);
        const datasets = [];
        if (chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]
                        ?.filter((item) => +item.hour % 2 === 0)
                        ?.map((item) => item.counter),
                    borderColor: i === 0 ? '#498cdd' : i === 1 ? '#27bd9c' : '#d04a4c',
                    tension: 0.4,
                    borderWidth: 1,
                });
            }
            setDataChart({ labels: labels, datasets: datasets });
        }
    }, [chart]);

    return (
        <div>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <div className={cx('wrapper')}>
                    <div>
                        <h3 className={cx('heading')}>#zingchart</h3>

                        {dataChart && (
                            <div className={cx('chart')}>
                                <Line data={dataChart} ref={chartRef} options={options} />
                                <div
                                    className={cx('tooltip')}
                                    style={{
                                        top: tooltipState.top,
                                        left: tooltipState.left,
                                        opacity: tooltipState.opacity,
                                    }}
                                >
                                    <DisplayedSong data={songInfo} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={cx('top100-wrapper')}>
                        <Top100 data={chartHome?.RTChart?.items} />
                    </div>

                    <div className={cx('weekChart-wrapper')}>
                        <WeekChart data={chartHome?.weekChart} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(ZingChart);
