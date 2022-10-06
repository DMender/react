var posts = ["This single page app is made in React. All of the comments are stored in localStorage on your computer, not an actual server. They can be cleared like cookies."];
var authors = ["Andy"];

// Store comments in localStorage
if(!!sessionStorage.posts) {
    posts = JSON.parse(sessionStorage.posts);
}
if(!!sessionStorage.authors) {
    authors = JSON.parse(sessionStorage.authors);
}/**/

// Comment class
class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: posts, author: authors};
        this.deleteComment = this.deleteComment.bind(this);
    }

    deleteComment() { //when firebase is added check to see if user is comment author
        authors.splice(this.props.postid, 1);
        localStorage.auth = JSON.stringify(authors);
        posts.splice(this.props.postid, 1);
        localStorage.comments = JSON.stringify(posts);
        window.location.reload();
    }

    render() {
        return (
            <div id="post"><span className="author">{this.state.author[this.props.postid]}</span><p >{this.state.content[this.props.postid]}</p><span onClick={this.deleteComment} className="delete">Delete</span></div>
        );
    }
}/**/

// Post class
class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <textarea placeholder="Leave a comment." id="comment"></textarea>
                <br/>
                <button id="submit" onClick={function() {
                    authors.push("Potential Employer or Client");
                    localStorage.auth = JSON.stringify(authors);
                    posts.push(document.getElementById("comment").value);
                    localStorage.comments = JSON.stringify(posts);
                    window.location.reload();
                    }}>Submit</button>
            </div>
        );
    }
}/**/

//The Main DOM of the React App
function App() {
    const comments = [];
    for (let i in posts) {
        comments.push(<Comment postid={i} key={i}/>);
    }
    return (

        <div>
            {comments}
            <br/>
            <Post/>
        </div>
    );
}
  
const domContainer = document.querySelector('#app_container');
const root = ReactDOM.createRoot(domContainer);
    root.render(<App/>);