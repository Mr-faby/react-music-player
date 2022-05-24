import React from 'react';
import './index.css';
import Progress from '../../components/Progress';
import { HiVolumeUp } from 'react-icons/hi';
import { AiFillStepBackward } from 'react-icons/ai';
import { AiFillStepForward } from 'react-icons/ai';
import { AiOutlinePause } from 'react-icons/ai';
import { AiOutlineCaretRight } from 'react-icons/ai';
import { AiOutlineSync } from 'react-icons/ai';
import Music from '../../assets/music/index.json';

let Audio;  // 音频dom
let currentPlayIdx = 0;  // 当前播放曲目索引

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pause: true,
            playProgressPosi: 'auto',
            volumeProgressPosi: '100%',
            currentPlay: Music[currentPlayIdx],
            currentMusicTime: ''
        };
    }

    componentDidMount() {
        Audio = document.getElementById('audio');
    }

    // 音量调节
    setVolume = (currProgress, ratio) => {
        this.setState({
            volumeProgressPosi: currProgress
        })
        Audio.volume = ratio.toFixed(2);
    }

    // 变更播放进度
    setPlayProgress = (currProgress, ratio) => {
        this.setState({
            playProgressPosi: currProgress
        })
        Audio.currentTime = (ratio * Audio.duration).toFixed(2)
    }

    // 播放和暂停
    playOrPause = () => {
        if (this.state.pause) {
            Audio.play()
        } else {
            Audio.pause()
        }
        this.setState({ pause: !this.state.pause })
    }

    // 监听播放时间变更，更新进度条和播放时间
    updatePlayProgress = () => {
        const surplusTime = parseInt(Audio.duration - Audio.currentTime),
            remainder = surplusTime % 60;
        this.setState({
            playProgressPosi: (Audio.currentTime / Audio.duration * 100).toFixed(2) + '%',
            currentMusicTime: parseInt(surplusTime / 60) + ':' + (remainder < 10 ? '0' + remainder : remainder)
        })
    }

    // 上一首
    playPrevious = () => {
        currentPlayIdx--;
        if (Math.abs(currentPlayIdx) === Music.length) {
            currentPlayIdx = 0;
        }
        this.setState({
            currentPlay: Music[currentPlayIdx < 0 ? currentPlayIdx + Music.length : currentPlayIdx],
            pause: false
        })
        setTimeout(() => {
            Audio.play()
        }, 0)
    }

    // 下一首
    playNext = () => {
        currentPlayIdx++;
        if (currentPlayIdx >= Music.length) {
            currentPlayIdx = 0;
        }
        this.setState({
            currentPlay: Music[currentPlayIdx],
            pause: false
        })
        setTimeout(() => {
            Audio.play()
        }, 0)
    }

    // 初始化音乐总时长
    initMusicTime = () => {
        if (Audio.currentTime) return;
        const duration = parseInt(Audio.duration);
        this.setState({
            currentMusicTime: parseInt(duration / 60) + ':' + duration % 60
        })
    }

    render() {
        return (
            <div className='player-comp' >
                <div className='player'>
                    <div className='music-list-link'>我的私人音乐坊 >></div>
                    <div className='curr-music-info'>
                        <div className='music-info'>
                            <p className='music-name'>{this.state.currentPlay.name}</p>
                            <p className='music-author'>{this.state.currentPlay.author}</p>
                        </div>
                        <div className={`music-img ${this.state.pause ? 'stop-rotate' : ''}`}>
                            <img src={require(`../../assets/music/${this.state.currentPlay.imgPath}`)}></img>
                        </div>
                    </div>
                    <div className='time-source'>
                        <span>-{this.state.currentMusicTime}</span>
                        <div className='source'>
                            <HiVolumeUp style={{ marginRight: '10px' }} />
                            <Progress currProgressWidth={this.state.volumeProgressPosi} handleProgressChange={this.setVolume} />
                        </div>
                    </div>
                    <div className='music-play-progress'>
                        <Progress currProgressWidth={this.state.playProgressPosi} width="100%" height="5px" pointSize="15px" handleProgressChange={this.setPlayProgress} />
                    </div>
                    <div className='play-index'><AiOutlineSync /></div>
                    <div className='music-play-control'>
                        <AiFillStepBackward onClick={this.playPrevious} />
                        <span style={{ padding: '0 100px' }} onClick={this.playOrPause}>
                            {this.state.pause ? <AiOutlineCaretRight /> : <AiOutlinePause />}
                        </span>
                        <AiFillStepForward onClick={this.playNext} />
                    </div>
                </div>
                <audio id='audio' onCanPlay={this.initMusicTime} onTimeUpdate={this.updatePlayProgress} onEnded={this.playNext} src={require(`../../assets/music/${this.state.currentPlay.filePath}`)}></audio>
            </div>
        )
    }
}