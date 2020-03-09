import React, {Component} from 'react'
import './Item.css'
import Check from "../img/check.svg"
import unCheck from "../img/un-check.svg"
import cross from "../img/cross.svg"
var classNames = require('classnames');
class Item extends Component{
    render(){
        var src = unCheck
        var {item,onClick,onRemove,onDoubleClick,className} = this.props
        var itemClass = classNames({
            'item-done':item.isDone
        })
        if(item.isDone){
            src= Check
        }
        return(
            <div className={className} onDoubleClick={onDoubleClick}>
                <img className="icon" src={src} onClick={onClick}></img>
                <div className={itemClass}>{this.props.item.title}</div>
                <img className="icon cross" src={cross} onClick={onRemove}></img>
                <input type="text" className="text-edit"/>
            </div>
        )
    }
}

export default Item