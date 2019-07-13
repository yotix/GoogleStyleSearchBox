import React from 'react';
import Input from '../../components/input/input';
import './header.css';
import UserList from '../../components/list-item/userList';
import Data from '../../models/mock';

class Header extends React.Component {

    constructor(props){
        super(props);
        this.state={
            data:[],
            search:"",
            searchResults:[],
            active:null
        }
        this.handleChange=this.handleChange.bind(this);
        this.keypress = this.keypress.bind(this);
        this.focus=this.focus.bind(this);
        this.blur=this.blur.bind(this);
        this.restoreMouse=this.restoreMouse.bind(this);        
    }

    handleChange(e){
        this.setState({
            search:e.target.value
        })
        // Filtering Data
        if(e.target.value!==""){
            const filteredData=Data.filter((val)=>{
                if (val.id.search(e.target.value) > -1
                    ||val.name.toLowerCase().search(e.target.value) > -1
                    ||val.address.toLowerCase().search(e.target.value) > -1
                    ||val.pincode.search(e.target.value) > -1
                    || val.items.join(" ").toLowerCase().search(e.target.value)>-1)
                return true;
                
                else{
                    return false;
                }
            });
            this.setState({
                searchResults:filteredData
            })
        }
        else{
            this.setState({
                searchResults:[]
            })
        }
    }

    focus(){
        this.refs.container.classList=["search-header focus"]
    }
    blur(){
        this.refs.container.classList=["search-header"]
    }

    restoreMouse(){
        if(this.refs.result){
            this.refs.result.classList="";
        }
    }

    keypress(e){
        if(this.refs[this.state.active])
        this.refs[this.state.active].classList="";
        if(e.keyCode===40){//keypress Down
            e.preventDefault();
            if(this.state.active>this.state.searchResults.length-1){
                this.setState({active:null})
            }
            
            this.setState({
                active:this.state.active!==null && this.state.active<this.state.searchResults.length-1?this.state.active+1:0
            })
            
            if(this.state.active!==null && this.state.active<this.state.searchResults.length){
                
                this.refs[this.state.active].parentElement.classList="hide-mouse";
                this.refs[this.state.active].scrollIntoView({block:'start',behavior:'smooth'})
            }
            
        }
        else if(e.keyCode===38){ //keypress Up
            e.preventDefault();
            
            if(this.state.active===0 ){
                this.setState({active:null})
            }
            
            this.setState({
                active:this.state.active!==null && this.state.active>0?this.state.active-1:this.state.searchResults.length-1
            })
            
            if(this.state.active!==null && this.state.active> -1)
            this.refs[this.state.active].scrollIntoView({block:'end',behavior:'smooth'});
            
            
        }
        
        else{
            if(this.refs[this.state.active])
            this.refs[this.state.active].classList="active";
        }
        
        console.log(this.state.active)
    }

    render(){
        return (
            <div className="search-header" ref="container"
            onMouseMove={this.restoreMouse}
            >
                <Input
                name="search"
                type="text"
                placeholder="Search users by ID, address,name.."
                value={this.state.search}
                onChange={this.handleChange} 
                onFocus={this.focus}
                onBlur={this.blur}
                onKeyPress={this.keypress}
                reset={()=>this.setState({search:"",searchResults:[]})}
                />
                {this.state.searchResults.length?(
                <ul
                ref="result"
                >
                 {
                    this.state.searchResults.map((item,idx)=>{
                        return (
                        <li ref={idx}
                            onMouseOver={(e)=>{this.setState({active:idx})}}
                             className={this.state.active===idx?"active":""} key={idx}><UserList highlight={this.state.search} user={item}/></li>
                             )
                    })}
                    </ul>
                    )
                    : this.state.search?(
                    <ul className="no-scroll">
                           <li className="no-result">No user found</li>

                    </ul>
                       ):""                
                }
            </div>
            )
        }
}

export default Header;