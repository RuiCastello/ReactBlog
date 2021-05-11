import React, { Component } from 'react';
//Aqui estamos a usar uma custom instance criada por nós do axios, que está no ficheiro axios.js na folder src 
import axiosInstance from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
// import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class Posts extends Component{

    state = {
        posts: [],
        // selectedPostId: null,
        // error: false
    };

    componentDidMount(){
        // console.log(this.props);

        if (!this.props.loaded){
            axiosInstance.get('/posts')
            .then( (response) => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map( (post) => {
                    return {
                        ...post,
                        author: 'Rui'
                    }
                })
                // this.setState({posts: updatedPosts});
                this.props.setLoaded(true);
                this.props.addPost(updatedPosts);
                // console.log(this.state.posts)
            })
            .catch( (err) => {
                console.log(err);
                // this.setState({error: true})
            });
        }
    }

  

    postSelectedHandler = (id) =>{
        // this.setState({selectedPostId: id});
        
        //Mudar a página para outra rota através de history.push
        // this.props.history.push({pathname: '/posts/' + id});
        this.props.history.push('/posts/' + id);
    }

    render(){

        let posts = this.props.posts.map((element, index) =>{
            return(
                //pode-se mudar o path usando o <Link> ou <NavLink> simplesmente usando uma função como o postSelectHandler que faz this.props.history.push(path)
                // <Link to={'/posts/' + element.id} key={element.id} >
                    <Post 
                    key={element.id}
                    title={element.title} 
                    author={element.author}
                    // clicked={ () => this.postSelectedHandler(element.id) } 
                    clicked={ () => this.postSelectedHandler(index+1) } 
                    />
                // </Link>
            );
        });

        return(
            <div>
                <section className="Posts">
                    {this.state.error ? <p style={{textAlign: 'center'}}>We're sorry but something went wrong, please try again.</p> : posts}
                </section>
                <Route 
                path={this.props.match.url + "/:id"} 
                exact 
                // component={FullPost} 
                render={
                    (props) =>(<FullPost {...props} deletePost={this.props.deletePost} posts={this.props.posts} /> )
                }
                />
            </div>
        )
    }

}

export default Posts;