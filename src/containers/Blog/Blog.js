import React, { Component } from 'react';
// import { Suspense } from 'react';
// import axios from 'axios';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import './Blog.css';
import asyncComponent from '../../hoc/asyncComponent';


// NEW REACT LAZY LOADING
// instead of doing this type of import:
import Posts from './Posts/Posts';
// WE DO:
// const Posts = React.lazy( () => import('./Posts/Posts') );


// OLD REACT LAZY LOADING
// In order to do lazy loading of the NewPost component we need to import it in a different way, NOT like this:
// import NewPost from './NewPost/NewPost';
// BUT like this:
const AsyncNewPost = asyncComponent( () => {
    return import('./NewPost/NewPost');
});

// import FullPost from './FullPost/FullPost';

class Blog extends Component {
    
    state = {
        // auth: false,
        auth: true,
        posts: [],
        loaded: false,
    }

    setLoaded = (value) =>{
        this.setState({loaded: value});
    }
    
    addPost = (post) =>{
        let oldPosts = [...this.state.posts];
        let lastId = 0;
        if (oldPosts.length > 0){
            let lastArrayElement = oldPosts.slice(-1);
            lastId = lastArrayElement[0].id;
            // console.log('LAST IDD ', lastId)
            // console.log('lastArrayElement ', lastArrayElement)
        }

        if(Array.isArray(post)){
            oldPosts = [...oldPosts, ...post];
        }
        else{
            post.id = lastId + 1;
            post.local = true;
            oldPosts.push(post);
        }
        this.setState({posts: oldPosts});
    }
    
    deletePost = (postId) =>{
        let oldPosts = [...this.state.posts];
        if (oldPosts.length > 0){
            oldPosts.splice(postId, 1);
            this.setState({posts: oldPosts});
        }
    }
    
    render () {
        // console.log(this.props)
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/* We could use Link or NavLink, NavLink is better because it applies css classes to it, for example it dynamically adds the class "active" to the link of the page that's currently opened via de router 
                            You can customize the name for the "active" class via the parameter activeClassName 
                            Also, you can directly apply an in-line style for when a NavLink is active with "activeStyle" */}
                            <li><NavLink 
                            activeStyle={{border: '2px solid tomato', borderRadius: '5px', padding: '2px'}}
                            activeClassName="my-active" 
                            to="/posts/" 
                            exact >Home</NavLink></li>
                            <li><NavLink 
                            activeStyle={{border: '2px solid tomato', borderRadius: '5px', padding: '2px'}}
                            activeClassName="my-active" 
                            to={{
                                //pathname is always absolute path
                                pathname: '/new-post',
                                
                                //in order to turn it into a relative path you need to to something different, check below
                                //Keep in mind that to do this you need props to be available in the component, in this component we actually don't have props so this won't work, it's just here as an example
                                // To solve the problem with not having this.props.match.url we could simply wrap this component on the export with "withRouter(Blog)"
                                // pathname: this.props.match.url + 'new-post',

                                hash: '#submit', //Just a non-working example for demonstration purposes
                                search: '?quick-submit=true' //Just a non-working example for demonstration purposes of the property search
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                
                {/* 
                <Route path="/" exact render={ () => (<h1>HOME</h1>)} />
                <Route path="/new-post" exact render={ () => (<h1>NEW POST</h1>)} /> */}
                

                {/* ROUTES GO HERE */}
                <Switch>
                    {/* Lazy Loading of a component on older versions of React */}
                    {this.state.auth ? 
                    <Route path="/new-post" 
                    render={(props) => (
                        <AsyncNewPost {...props} addPost={this.addPost} />
                      )}
                    /> : null
                    } 
                    
                    {/* No lazy loading */}
                    <Route 
                    path="/posts" 
                    // component={Posts} 
                    render={(props) => (
                        <Posts {...props} 
                        loaded={this.state.loaded}
                        setLoaded={this.setLoaded}
                        addPost={this.addPost} 
                        posts={this.state.posts} 
                        deletePost={this.deletePost} 
                        />
                      )}
                    />
                    {/* LAZY LOADING ON NEW VERSIONS OF REACT: */}
                    {/* <Route path="/posts" render={ () => <Suspense fallback={<div>Loading...</div>}><Posts /></Suspense>} /> */}

                    {/* Redirect com "from" tem de estar dentro de um <Switch> */}
                    <Redirect from="/" to="/posts" />

                    {/* Usar uma espécie de catch-all para 404 */}
                    <Route render={ () => <h1>Not Found</h1>} />



                    {/* Podemos ter uma rota "duplicada" para termos posts na raíz e em /posts mas existe uma maneira melhor de fazer isso, com "Redirect" */}
                    {/* <Route path="/" component={Posts} /> */}
                    
                    {/* Tirámos o "exact" da route da raíz porque estamos a usar uma subroute dentro da route "/" que usa o components posts, ou seja para que a route que está dentro do componente posts.js seja executada, o componente tem de ser lido, e portanto a rota raíz não pode ser exata. Além disso como esta rota é uma espécie de catch-all, temos de mete-la no fim da lista das rotas, para não impedir as outras de serem abertas */}
                    {/* <Route path="/" exact component={Posts} /> */}
                </Switch>


                {/* <Posts /> */}

                {/* <section>
                    <FullPost 
                    id={this.state.selectedPostId ? this.state.selectedPostId : null} 
                    // title={this.state.selectedPostId ? this.state.posts.find( (element) => element.id === this.state.selectedPostId).title : null} 
                    // author={this.state.selectedPostId ? this.state.posts.find( (element) => element.id === this.state.selectedPostId).author : null} 
                    // body={this.state.selectedPostId ? this.state.posts.find( (element) => element.id === this.state.selectedPostId).body : null} 
                    />
                </section>
                <section>
                    <NewPost />
                </section> */}
            </div>
        );
    }
}

export default Blog;