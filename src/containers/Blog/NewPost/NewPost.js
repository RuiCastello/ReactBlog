import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Rui',
        submitted: false,
    }


    componentDidMount(){
        // console.log(this.props);
    }


    postDataHandler = () =>{
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author,
        };

        this.props.addPost(data);

        axios.post('/posts', data)
            .then( (response) => {
                // console.log(response);

                //HISTORY PUSH
                //Podemos fazer isto para mudar o user de página para /posts
                //history.push() mete um novo url no stack de history
                this.props.history.push('/posts');
                
                //HISTORY REPLACE
                //history.replace() faz o mesmo que um <Redirect to />, ou seja altera a página atual para um novo endereço
                //A diferença entre push e replace é que quando o utilizador usar o back button do browser, no push pode voltar para a página antes de termos feito push, mas com o redirect ou replace o utilizador não pode voltar para a página imediatamente anterior ao replace/redirect pois ela foi literalmente trocada por outra.

                // Ou podemos fazer assim para ativar o <Redirect to="/posts" que se encontra no método render()
                // this.setState({submitted: true});
            });

    }

    render () {
        return (
            <div className="NewPost">
                {/* REDIRECT CONDICIONAL */}
                {this.state.submitted ? <Redirect to="/posts" /> : null}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Rui">Rui</option>
                    <option value="João">João</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;