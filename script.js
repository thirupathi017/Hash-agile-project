let db;
let player;

// Open IndexedDB
const openDB = () => {
    let request = indexedDB.open("VideoDB", 1);
    request.onupgradeneeded = function (event) {
        let db = event.target.result;
        if (!db.objectStoreNames.contains("videos")) {
            db.createObjectStore("videos", { keyPath: "id" });
        } 
    };
    request.onsuccess = function (event) {
        db = event.target.result;
        loadLastVideo();
    };
    request.onerror = function (event) {
        console.log("Database error: ", event.target.error);
    };
};

// Save playback time in IndexedDB
const savePlaybackTime = (videoId, time) => {
    if (!db) return;
    let transaction = db.transaction(["videos"], "readwrite");
    let store = transaction.objectStore("videos");
    store.put({ id: videoId, time: time });
};

// Get playback time from IndexedDB
const getPlaybackTime = (videoId, callback) => {
    if (!db) return;
    let transaction = db.transaction(["videos"], "readonly");
    let store = transaction.objectStore("videos");
    let request = store.get(videoId);
    request.onsuccess = function () {
        callback(request.result ? request.result.time : 0);
    };
};

// Load the last played video
const loadLastVideo = () => {
    let lastUrl = localStorage.getItem("lastVideoUrl");
    if (lastUrl) {
        document.getElementById("videourl").value = lastUrl;
        playVideo(lastUrl, true);
    }
};

// Play video
const playVideo = (url = null, isReload = false) => {
    let inputUrl = url || document.getElementById("videourl").value;
    let iframe = document.getElementById("frame");

    if (!inputUrl.includes("vimeo.com")) {
        alert("Please enter a valid Vimeo URL.");
        return;
    }

    let lastPartUrl = inputUrl.split("/").pop();
    let videoUrl = `https://player.vimeo.com/video/${lastPartUrl}`;
    iframe.src = videoUrl;

    localStorage.setItem("lastVideoUrl", inputUrl); // Store URL

    setTimeout(() => {
        player = new Vimeo.Player(iframe);
        
        if (isReload) {
            getPlaybackTime(lastPartUrl, (time) => {
                player.setCurrentTime(time).catch(error => console.log("Error setting time:", error));
            });
        }

        player.on("timeupdate", function (data) {
            savePlaybackTime(lastPartUrl, data.seconds);
        });

    }, 1000);
};

openDB();
