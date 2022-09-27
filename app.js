'use strict';

const app = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return (
        <button onClick={() => this.setState({ liked: false })} class="clicked"> unlike
        </button>
      );
    }

    return (
        <button onClick={() => this.setState({ liked: true })}>
            like
        </button>
      );
  }
}

const domContainer = document.querySelector('#app_container');
const root = ReactDOM.createRoot(domContainer);
root.render(app(LikeButton));