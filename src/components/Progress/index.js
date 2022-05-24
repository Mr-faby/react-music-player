import React from "react";
import './index.css';

export default class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.progressRef = React.createRef();
    }

    // 修改进度
    setCurrProgress = (event) => {
        const clientX = event.clientX;
        const { left, width } = this.progressRef.current.getBoundingClientRect();
        const progress = clientX - left;
        this.props.handleProgressChange(progress, progress / width); // 返回当前进度和比值
    }

    render() {
        return (
            <div className="progress-comp" ref={this.progressRef} onClick={this.setCurrProgress} style={{ width: this.props.width, height: this.props.height }}>
                <div className="curr-progress" style={{ width: this.props.currProgressWidth,minWidth: this.props.pointSize }}>
                    <span style={{ width: this.props.pointSize, height: this.props.pointSize }}></span>
                </div>
            </div>
        )
    }
}