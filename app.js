// fallback variables if the server is down
var posts = ["This single page application is made with React. You don't see any comments because Firebase failed to connect. Please attempt to refresh your page."];
var authors = ["Error"];

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

    deleteComment() {
    /*/ TODO: check to see if poster is author, remove comment from database
        authors.splice(this.props.postid, 1);
        localStorage.auth = JSON.stringify(authors);
        posts.splice(this.props.postid, 1);
        localStorage.comments = JSON.stringify(posts);
        window.location.reload();
    /**/
        console.log("baleeted");
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
                    if (authors[0] != "Error") {
                            authors.push("Potential Employer or Client");
                            sessionStorage.authors = JSON.stringify(authors);
                            posts.push(document.getElementById("comment").value);
                            sessionStorage.posts = JSON.stringify(posts);
                        } else {
                            alert("You must connect to the Firebase server before you attempt to post a message!");
                        }
                    }}>Submit</button>
            </div>
        );
    }
}/**/

// The Main DOM of the React App
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