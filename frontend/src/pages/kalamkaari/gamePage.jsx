import Canvas from "../../components/Kalamkaari/canvas";
import Button from "../../components/Button";
import { getToken } from "../../services/LocalStorageService";
import axios from "axios";
import { useState } from "react";
import Timer from "../../components/Kalamkaari/Timer";
import { getWord, useTimer } from "../../services";
import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TextToSpeech from "../../components/Kalamkaari/TextToSpeach";
import Modalpopup from "../../components/Modal.jsx";


const fonts = ["poppins", "arial", "roboto", "novaFlat", "comicNeue"];


function Kalamkaari({ theme, level }) {
  const [words, setWords] = useState("");
  const [definitions, setDefinitions] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const { timer, handleStart, handlePause } = useTimer();
  const [font, setFont] = useState("poppins");
  const handleChange = (event) => {
    console.log("Check Font",event.target.value
    )
    setFont( event.target.value)
  }


  const handleSubmit = async() => {
      setIsPlaying(true)
      handleStart()
      const access_token = getToken().access_token
      const url = `/kalamkaari/word/${theme}/${level}/`
      console.log(getToken().access_token)
      try{
      const res = await axios.get(url, { headers: { Authorization: `Bearer ${access_token}` }})
      console.log("api")
      console.log(res.data)
      setWords(res.data.word)
      setDefinitions(res.data.definition)
      localStorage.setItem("word",res.data.word)
      }catch(err)
      {
        console.log(err)
      }
  }
  return (
    <>
      <div
        class={`container mx-auto text-grey-darkest mt-40 mb-20 font-${font} text-[20px]`}
      >
        <Modalpopup
          text={
            <ol>
              <li>
                Click on the "Click to Start" button to get a word or letter.
              </li>
              <li>Try to write the word in the given canvas.</li>
              <li>
                Click on defintion switch to learn the definition of the word.
              </li>
              <li>Click on predict to get insights on your performance.</li>
              <li>
                See the total time elapsed on the timer in the left.
              </li>
              <li>
                To change the font, select your desired font from the dropdown
                menu.
              </li>
            </ol>
          }
        ></Modalpopup>


        <div class=" -mx-2 ">
          <div className="justify-between items-center w-full flex mt-5">
            <Timer time={timer} />
            <TextField
              size="small"
              label="Choose Font"
              sx={{ width: 200 }}
              select
              value={font}
              onChange={handleChange}
            >
              {fonts.map((fontName) => (
                <MenuItem key={fontName} value={fontName}>
                  {fontName}
                </MenuItem>
              ))}
            </TextField>
          </div>


          <div class="px-4">
            <div class="w-full  md:mx-2 mb-4 md:mb-0 ">
              <div class="bg-primary rounded-lg overflow-hidden shadow-sm  relative">
                <div class=" pt-4 h-auto md:h-40 lg:h-[80%] ">
                  <div
                    className={`text-center items-center justify-center flex flex-col font-${font}`}
                  >
                    {isPlaying === false ? (
                      <button
                        type="submit"
                        name="action"
                        onClick={handleSubmit}
                      >
                        <div className={`font-${font}`}>click to start</div>
                      </button>
                    ) : theme === "dictation" ? (
                      <div>
                        <TextToSpeech word={words} />
                      </div>
                    ) : (
                      <div>{words}</div>
                    )}
                  </div>
                  <Canvas
                    time={timer}
                    font={font}
                    definition={definitions}
                    isPlaying={isPlaying}
                    level={level}
                    word={words}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default Kalamkaari;



