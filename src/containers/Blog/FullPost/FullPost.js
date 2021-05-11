import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    
    state = {
        loadedPost: null,
    }


    //Aqui mudámos de componentDidUpdate para componentDidMount porque estamos a usar o router, ou seja, aqui não fazemos updates ao componente quando o abrimos pela primeira vez, montamos é o componente.
    // componentDidUpdate(){
    componentDidMount(){
        // console.log(this.props)
        this.loadData();
    }

    //Aqui usamos o componenteDidUpdate para que o post seja lido novamente quando não mudamos de rota-mãe mas mudamos apenas a rota-filha. Ou seja quando mudamos de um endereço do tipo /posts/1 para /posts/2 , o /posts não muda, ou seja, o componentDidMount só é executado da primeira vez e não volta a ler o segundo post. 
    componentDidUpdate(){
       this.loadData();
    }
    
    loadData () {
        if (this.props.match.params.id){
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id) ){ //Aqui usamos um (MAIS) +this.props.match.params.id para converter a variavel em um número pois qql coisa que vem de um url vem como string.   
                
                let postID = +this.props.match.params.id;
                if( (postID - 1) in this.props.posts && 'local' in this.props.posts[postID-1] && this.props.posts[postID-1].local === true){
                    let loadedPost = this.props.posts[postID-1];
                    loadedPost.id = postID;
                    this.setState({loadedPost: loadedPost});
                }
                else{
                    axios.get('/posts/' + this.props.match.params.id)
                    .then( (response) => {
                        // console.log(response);
                        let loadedPost = response.data;
                        loadedPost.id = postID;
                        this.setState({loadedPost: loadedPost});
                    });
                }
            }
        }
    }

    deletePostHandler = () => {
        let postID = +this.props.match.params.id;
        this.props.deletePost(postID-1);

        axios.delete('/posts/' + this.props.match.params.id)
            .then( (response) => {
                console.log(response);
            });

        this.setState({loadedPost: null});
        this.props.history.replace('/posts');

    }

    
    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        
        if (this.props.match.params.id){
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if (this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;