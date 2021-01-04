import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router";
import socketIOClient from "socket.io-client";
import axios from "axios";
import YouTube from "react-youtube";
import Navbar from "../../layout/Navbar.js";
import "./css/partysession.scss";
import SearchBackground from "./img/search_image.png";

// Youtube Player settings
const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 1,
  },
};

// Socket Connection Port
const SOCKET_SERVER = `${process.env.BACKEND_HOST}`;
console.log("SOCKET_SERVER:", SOCKET_SERVER);

const PartySession = () => {
  const location = useLocation();
  const roomID = location.state.roomID;
  const name = location.state.name;

  const [showSearchForm, toggleShowSearchForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [queueItems, updateQueueItems] = useState([]);

  // Socket Object
  const socketRef = useRef();

  // YouTube Player Object
  const ytPlayerRef = useRef();
  const handleReady = (event) => {
    ytPlayerRef.current = event.target;
  };

  // Create Socket connection
  useEffect(() => {
    axios.get(`${process.env.BACKEND_HOST}/queueitems`).then(
      (res) => {
        updateQueueItems(res.data);
      },
      (error) => {
        console.log(error);
      }
    );

    socketRef.current = socketIOClient(SOCKET_SERVER, {
      query: { roomID },
    });

    socketRef.current.on("addNewItem", (newItem) => {
      updateQueueItems((queueItems) => [...queueItems, newItem]);
    });

    socketRef.current.on("removeItem", (itemIndex) => {
      updateQueueItems((queueItems) =>
        queueItems.filter((item, i) => i !== itemIndex)
      );
    });

    socketRef.current.on("placeItemFirst", (newQueueItems) => {
      updateQueueItems(newQueueItems);
    });

    socketRef.current.on("playVideo", () => {
      ytPlayerRef.current.playVideo();
    });

    socketRef.current.on("pauseVideo", () => {
      ytPlayerRef.current.pauseVideo();
    });
  }, []);

  // Search for YouTube Video
  function searchYouTube(event) {
    event.preventDefault();
    console.log(searchTerm);
    axios
      .post(`${process.env.BACKEND_HOST}/youtube`, { searchTerm: searchTerm })
      .then(
        (res) => {
          console.log(res.data);
          setSearchResults(res.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function addToQueue(newItem) {
    toggleShowSearchForm(false);
    setSearchTerm('');
    setSearchResults([]);
    newItem.contributor = name;
    console.log(newItem);
    socketRef.current.emit("addNewItem", {
      item: newItem,
      roomID: roomID,
    });
  }

  function removeQueueItem(index) {
    socketRef.current.emit("removeItem", {
      itemIndex: index,
      roomID: roomID,
    });
  }

  function placeItemFirst(index) {
    socketRef.current.emit("placeItemFirst", {
      itemIndex: index,
      roomID: roomID,
    });
  }

  // Control Actions
  function playVideo() {
    socketRef.current.emit("playVideo", {
      roomID: roomID,
    });
  }

  function pauseVideo() {
    socketRef.current.emit("pauseVideo", {
      roomID: roomID,
    });
  }

  return (
    <div>
      <Navbar />
      <div className="youtube-page" id="mobile">
        <div className="overlay"></div>

        {/* Search Form-------------- */}
        {showSearchForm ? (
          <div className="search-form">
            {searchResults.length == 0 ? (
              <div className="search-msg">
                <img src={SearchBackground} alt="Search Background" />
                <p>Search for videos to add to the queue</p>
              </div>
            ) : (
              <div></div>
            )}

            <button
              className="exit-search-form"
              onClick={() => toggleShowSearchForm(false)}
            >
              &times;
            </button>
            <form>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={(event) => searchYouTube(event)}>Search</button>
            </form>

            <div className="container">
              <div className="search-results">
                {searchResults.map((result, index) => (
                  <div>
                    <div className="search-result" key={index}>
                      <img src={result.thumbnail} />
                      <div className="text">
                        <p className="title">{result.title}</p>
                        <p className="author">{result.author.name}</p>

                        <div className="actions">
                          <button
                            className="queue-btn"
                            onClick={() => addToQueue(result)}
                          >
                            Queue
                          </button>
                          <button className="preview-btn">Preview</button>
                        </div>
                      </div>
                    </div>

                    <div className="divider"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {/* Page-------------- */}
        <div className="container">
          <h1>Room: {roomID} </h1>

          <div className="queue">
            <div className="queue-items">
              {queueItems.map((item, index) => (
                <div key={index} className="queue-item">
                  <img src={item.thumbnail} />
                  <div className="item-info">
                    <p className="title" onClick={() => placeItemFirst(index)}>
                      {item.title}
                    </p>
                    <div className="contributor">
                      <svg
                        width="11"
                        height="14"
                        viewBox="0 0 11 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="5.37759"
                          cy="3.32894"
                          r="3.32894"
                          fill="#CECECE"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.83892 6.42389C1.14958 6.83703 0.247459 8.83912 0 9.84198H2.62717e-05V10.3156C2.62717e-05 11.9724 1.34317 13.3156 3.00002 13.3156H8.00002C9.65687 13.3156 11 11.9724 11 10.3156V9.8419H11C10.8096 7.73798 9.16362 6.74909 8.14394 6.44107C7.46434 7.11208 6.53058 7.52629 5.50007 7.52629C4.46081 7.52629 3.51994 7.105 2.83892 6.42389Z"
                          fill="#CECECE"
                        />
                      </svg>
                      <p>{item.contributor}</p>
                    </div>

                    <button>&times;</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="controls">
          <div className="playback">
            <button className="rewind">
              <svg
                width="17"
                height="24"
                viewBox="0 0 17 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.33936 23H3.97705V13.9692L1.24512 14.9727V13.7422L5.12695 12.2847H5.33936V23ZM15.9961 18.4517C15.9961 20.0386 15.7251 21.2178 15.1831 21.9893C14.6411 22.7607 13.7939 23.1465 12.6416 23.1465C11.5039 23.1465 10.6616 22.7705 10.1147 22.0186C9.56787 21.2617 9.28467 20.1338 9.26514 18.6348V16.8257C9.26514 15.2583 9.53613 14.0938 10.0781 13.332C10.6201 12.5703 11.4697 12.1895 12.627 12.1895C13.7744 12.1895 14.6191 12.5581 15.1611 13.2954C15.7031 14.0278 15.9814 15.1606 15.9961 16.6938V18.4517ZM14.6411 16.5986C14.6411 15.4512 14.48 14.6162 14.1577 14.0938C13.8354 13.5664 13.3252 13.3027 12.627 13.3027C11.9336 13.3027 11.4282 13.564 11.1108 14.0864C10.7935 14.6089 10.6299 15.4121 10.6201 16.4961V18.6641C10.6201 19.8164 10.7861 20.6685 11.1182 21.2202C11.4551 21.7671 11.9629 22.0405 12.6416 22.0405C13.3105 22.0405 13.8062 21.7817 14.1284 21.2642C14.4556 20.7466 14.6265 19.9312 14.6411 18.8179V16.5986Z"
                  fill="#ADADAD"
                />
                <path
                  d="M0.894436 4.86023C0.525911 4.67597 0.525911 4.15007 0.894435 3.9658L8.10227 0.361886C8.43472 0.195661 8.82588 0.437408 8.82588 0.809099V8.01694C8.82588 8.38863 8.43472 8.63038 8.10227 8.46415L0.894436 4.86023Z"
                  fill="#ADADAD"
                />
                <path
                  d="M6.09038 4.8711C5.69093 4.69634 5.69093 4.1297 6.09038 3.95494L14.4296 0.306512C14.76 0.161986 15.1301 0.404014 15.1301 0.76459V8.06144C15.1301 8.42202 14.76 8.66405 14.4296 8.51952L6.09038 4.8711Z"
                  fill="#ADADAD"
                />
              </svg>
            </button>

            <button className="pause" onClick={pauseVideo}>
              <svg
                width="29"
                height="36"
                viewBox="0 0 29 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 2C0 0.895431 0.895431 0 2 0H5C6.10457 0 7 0.895431 7 2V34C7 35.1046 6.10457 36 5 36H2C0.89543 36 0 35.1046 0 34V2Z"
                  fill="#ADADAD"
                />
                <rect x="22" width="7" height="36" rx="2" fill="#ADADAD" />
              </svg>
            </button>

            <button className="forward">
              <svg
                width="17"
                height="24"
                viewBox="0 0 17 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.33936 22.736H3.97705V13.7052L1.24512 14.7086V13.4781L5.12695 12.0206H5.33936V22.736ZM15.9961 18.1876C15.9961 19.7745 15.7251 20.9537 15.1831 21.7252C14.6411 22.4967 13.7939 22.8824 12.6416 22.8824C11.5039 22.8824 10.6616 22.5065 10.1147 21.7545C9.56787 20.9977 9.28467 19.8698 9.26514 18.3707V16.5616C9.26514 14.9943 9.53613 13.8297 10.0781 13.068C10.6201 12.3063 11.4697 11.9254 12.627 11.9254C13.7744 11.9254 14.6191 12.2941 15.1611 13.0314C15.7031 13.7638 15.9814 14.8966 15.9961 16.4298V18.1876ZM14.6411 16.3346C14.6411 15.1871 14.48 14.3522 14.1577 13.8297C13.8354 13.3024 13.3252 13.0387 12.627 13.0387C11.9336 13.0387 11.4282 13.2999 11.1108 13.8224C10.7935 14.3448 10.6299 15.1481 10.6201 16.2321V18.4C10.6201 19.5524 10.7861 20.4044 11.1182 20.9562C11.4551 21.5031 11.9629 21.7765 12.6416 21.7765C13.3105 21.7765 13.8062 21.5177 14.1284 21.0001C14.4556 20.4825 14.6265 19.6671 14.6411 18.5538V16.3346Z"
                  fill="#ADADAD"
                />
                <path
                  d="M16.1056 4.59619C16.4741 4.41193 16.4741 3.88603 16.1056 3.70177L8.89773 0.0978481C8.56528 -0.0683774 8.17412 0.17337 8.17412 0.545061V7.7529C8.17412 8.12459 8.56528 8.36634 8.89773 8.20011L16.1056 4.59619Z"
                  fill="#ADADAD"
                />
                <path
                  d="M10.9096 4.60706C11.3091 4.4323 11.3091 3.86566 10.9096 3.6909L2.57036 0.0424739C2.24001 -0.102052 1.86995 0.139976 1.86995 0.500552V7.79741C1.86995 8.15798 2.24001 8.40001 2.57036 8.25549L10.9096 4.60706Z"
                  fill="#ADADAD"
                />
              </svg>
            </button>
          </div>

          <button
            className="add-item"
            onClick={() => toggleShowSearchForm(true)}
          >
            +
          </button>
        </div>
      </div>

      <div className="youtube-page" id="desktop">
        {queueItems.length != 0 ? (
          <YouTube
            videoId={queueItems[0].videoId}
            opts={opts}
            onReady={handleReady}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default PartySession;
