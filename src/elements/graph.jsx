import React, {PropTypes, Component} from 'react'
import {dispatch, listenner} from '../core/dispatcher'

export class Graph extends Component {

    static propTypes = {

        height     : PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),

        listener : PropTypes.number.isRequired

    };

    constructor() {

        super(...arguments)

        this.state = {
            cols : [],
            maxCols : 15,
        }


    }

    componentWillReceiveProps(nextProps) {
        const { cols } = this.state

        this.setState({
            cols : [
                {
                    pourcent : nextProps.listener
                },
                ...cols

            ].splice(0, this.state.maxCols)
        })
    }


    getGreenToRed(percent){
        percent = 100 - percent
        let r = percent<50 ? 255 : Math.floor(255-(percent*2-100)*255/100);
        let g = percent>50 ? 255 : Math.floor((percent*2)*255/100);
        return 'rgba('+r+','+g+',0, 0.55)';
    }


    getColor(pourcent) {

        return this.getGreenToRed(pourcent);

    }

    render() {

        const { cols, maxCols } = this.state
        const { height } = this.props

        return (
            <div style={{ display: 'flex', alignItems: 'flex-end', height: height }}>
                {
                    cols.map((k, index) => {
                        if (index > this.state.maxCols) return;

                        let style = {
                            height : k.pourcent + '%',
                            width : (100 / maxCols) + '%',
                            background : this.getColor(k.pourcent)
                        }

                        return (
                            <div key={index} className="graph-elem" style={style}></div>
                        )
                    })
                }
            </div>
        )
    }

}
