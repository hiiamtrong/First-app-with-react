import React, {Component} from 'react'
import './Item.css'
import Check from "../img/check.svg"
import unCheck from "../img/un-check.svg"
import cross from "../img/cross.svg"
var classNames = require('classnames');
class Item extends Component{
    render(){
        var src = unCheck
        var {item,onClick,onRemove,onDoubleClick,onEdit,className,Input} = this.props
        var itemClass = classNames({
            'item-done':item.isDone
        })
        if(item.isDone){
            src= Check
        }
        return(
            <div className={className} >
                <img className="icon" src={src} onClick={onClick}></img>
                <div className={itemClass} onDoubleClick={onDoubleClick}>{this.props.item.title}</div>
                <img className="icon cross" src={cross} onClick={onRemove}></img>
                <input onKeyUp={onEdit} type="text" className= {Input}/>
            </div>
        )
    }
}

export default Item