/** @jsx jsx */
import React, { useState, useEffect, Fragment } from "react"
import { jsx, Box, Flex, Input, Button, Label } from "theme-ui"
import Axios from "axios"
export default function Videos() {
  const [trending, setTrending] = useState([])
  const [error, setError] = useState(null)
  const [heading, setHeading] = useState("")
  const [search, setSearch] = useState(undefined)
  const [playing, setPlaying] = useState(false)
  const [loadingText, setLoadingText] = useState("Loading...")
  const [waitTenSeconds, setwaitTenSeconds] = useState(false)

  useEffect(() => {
    async function getTrending() {
      const url = "/api/trending"
      // const url = "/.netlify/functions/get-trending"
      try {
        const {
          data: {
            error,
            videosUrls: { collector },
          },
        } = await Axios.get(url)
        setTrending(collector)
        setError(error)
        setHeading("trending")
      } catch (error) {
        setError(error)
        console.error(error)
      }
    }


    getTrending()
  }, [])

  async function wait10Seconds() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setwaitTenSeconds(true)
        resolve(true)
      }, 10000)
    })
  }

  function onInputChange(e) {
    const value = e.target.value
    const sanitizedSearch = value.replace(/[^a-zA-Z0-9]/g, "")
    setSearch(sanitizedSearch)
  }

  async function getSearch() {
    const url = "/api/search"
    // const url = "/.netlify/functions/search"
    setTrending([])
    setHeading("")
    try {
      const {
        data: {
          error,
          videosUrls: { collector },
        },
      } = await Axios.get(`${url}?tag=${search}`)
      setTrending(collector)
      setError(error)
      setHeading(`#${search}`)
      if (collector.length <= 2) {
        setLoadingText("Sorry, no videos match this search tag.")
      }
    } catch (error) {
      setError(error)
    }
  }

  function onPlaying(e) {
    setPlaying(true)
    // e.target.defaultPlaybackRate = 1;
    console.log("video playing")
  }
  function onPause(e) {
    setPlaying(false)
    // e.target.defaultPlaybackRate = 1;
    console.log("video not playing")
  }
  function onHover(e) {
    console.log("hovering video, playbackRate ", e.target.playbackRate)
    if (playing === true) {
      e.target.playbackRate = 0.5
    }
  }
  function onLeave(e) {
    console.log("leaving video")
    if (playing === true) {
      e.target.playbackRate = 1
    }
  }


  if (error !== null) {
    return <Box>There is an issue getting trending videos. Error:{error}</Box>
  }

  return (
    <Fragment>
      <Flex sx={{ mb: 4, flexWrap: "wrap" }}>
        <Label
          sx={{
            flex: "1 1 100%",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: ".75rem",
            paddingBottom: ".125em",
            color: "tertiary",
          }}
          htmlFor="search"
        >
          Input Tag
        </Label>
        <Input
          id="search"
          name="search"
          onChange={onInputChange}
          onKeyDown={e => {
            if (e.keyCode === 13) getSearch()
          }}
          sx={{ borderRadius: 0, flex: "1 1 80%" }}
        />
        <Button
          sx={{
            width: "100%",
            borderRadius: 0,
            flex: "1 1 20%",
          }}
          onClick={getSearch}
        >
          Go
        </Button>
      </Flex>
      <h2 sx={{ textAlign: "left" }} className="list__heading">
        {heading}
      </h2>
      <Flex
        sx={{
          flexWrap: "wrap",
        }}
      >
        {trending.length > 2 ? (
          trending.map(video => {
            return (
              <Box
                // p={2}
                sx={{
                  wordBreak: "break-all",
                  flex: ["1 100%", "1 50%", "1 30%"],
                  maxWidth: "calc(980px - 66%)",
                }}
                key={video.id}
              >
                <video
                  controls
                  poster={video.imageUrl}
                  width="auto"
                  height="550"
                  onPlaying={onPlaying}
                  onPause={onPause}
                  onMouseEnter={onHover}
                  onMouseLeave={onLeave}
                  sx={{
                    maxWidth: "100%",
                  }}
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Sorry, your browser doesn't support embedded videos.
                </video>
              </Box>
            )
          })
        ) : (
          <p>{loadingText}</p>
        )}
      </Flex>
    </Fragment>
  )
}
