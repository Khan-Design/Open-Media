import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchStreams} from '../../actions';
import './StreamList.css';

class StreamList extends React.Component {
  componentDidMount () {
    this.props.fetchStreams ();
  }

  renderAdmin (stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList () {
    let imgSrc = stream => {
      if (stream.id === 1) {
        return 'https://www.pngkey.com/png/full/266-2669948_amazing-2508371-960-720-amazing-word-images-png.png';
      } else if (stream.id === 2) {
        return 'https://refactoring.guru/images/refactoring/content/index/refactoring-i1.png';
      } else {
        return 'https://s0.geograph.org.uk/geophotos/06/41/92/6419251_b95a421b.jpg';
      }
    };
    return this.props.streams.map (stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin (stream)}
          <img className="avatar" src={imgSrc (stream)} />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate () {
    if (this.props.isSignedIn) {
      return (
        <div style={{textAlign: 'right'}}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render () {
    return (
      <div>
        <div className="maintitle">
          <h2>Streams</h2>
        </div>
        <div className="ui celled list">{this.renderList ()}</div>
        {this.renderCreate ()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values (state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect (mapStateToProps, {fetchStreams}) (StreamList);
