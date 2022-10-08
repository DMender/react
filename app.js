// fallback variables if the server is down
var posts = ["This single page application is made with React. You don't see any comments because Firebase failed to connect. If the browser does not reconnect automatically in 5 seconds please attempt to refresh your page."];
var authors = ["Error"];
var idlist = ["001"];
var datelist = ["01/01/1970"];

// Store comments in localStorage
if (!!sessionStorage.posts) {
    posts = JSON.parse(sessionStorage.posts);
}
if (!!sessionStorage.authors) {
    authors = JSON.parse(sessionStorage.authors);
}
if (!!sessionStorage.idlist) {
    idlist = JSON.parse(sessionStorage.idlist);
}
if (!!sessionStorage.datelist) {
    datelist = JSON.parse(sessionStorage.datelist);
}/**/

// assign a quick and dirt poster ID, login is beyond the scope of this demo
if (localStorage.authorid == undefined) {
localStorage.authorid = Date.now() + Math.floor(Math.random() * 10000);
console.log("Your browser ID is: " + localStorage.authorid);
}/**/

// Comment class
class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: posts, author: authors, postdate: datelist};
        this.deleteComment = this.deleteComment.bind(this);
    }

    deleteComment() {
        if (idlist[this.props.postid] == localStorage.authorid) {
            authors.splice(this.props.postid, 1);
            sessionStorage.authors = JSON.stringify(authors);
            posts.splice(this.props.postid, 1);
            sessionStorage.posts = JSON.stringify(posts);
            idlist.splice(this.props.postid, 1);
            sessionStorage.idlist = JSON.stringify(idlist);
            datelist.splice(this.props.postid, 1);
            sessionStorage.datelist = JSON.stringify(datelist);
            console.log("baleeted");
        } else {
            alert('Only the comment author may delete a message.');
        }
    }

    componentDidMount() {
        if (this.state.author[this.props.postid] == "Error") {
            setTimeout(location.reload.bind(window.location), 3000);
        }
    }

    render() {
        const deleteButton = [<span className="date" key="0">{this.state.postdate[this.props.postid]}</span>];
        if (idlist[this.props.postid] == localStorage.authorid) {
            deleteButton.push(<span onClick={this.deleteComment} className="delete" key="1">Delete</span>);
        }
        return (
            <div id="post"><span className="author">{this.state.author[this.props.postid]}</span><p >{this.state.content[this.props.postid]}</p>{deleteButton}</div>
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
                    const d = new Date();
                    var posttime = d.toLocaleDateString() + " - " + d.toLocaleTimeString();
                    if (authors[0] != "Error") {
                            authors.push("Potential Employer");
                            sessionStorage.authors = JSON.stringify(authors);
                            posts.push(document.getElementById("comment").value);
                            sessionStorage.posts = JSON.stringify(posts);
                            idlist.push(localStorage.authorid);
                            sessionStorage.idlist = JSON.stringify(idlist);
                            datelist.push(posttime);
                            sessionStorage.datelist = JSON.stringify(datelist);
                        } else {
                            alert("You must connect to the Firebase server before you attempt to post a message!");
                            location.reload();
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
            <div id="scroller">
            {comments}
            </div>
            <br/>
            <Post/>
        </div>
    );
}
  
const domContainer = document.querySelector('#app_container');
const root = ReactDOM.createRoot(domContainer);
    root.render(<App/>);