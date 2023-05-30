import React, { useMemo } from "react";
import { Howl } from "howler";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
export default function ColorRadios({ color, setColor }) {
  const popSound = useMemo(
    () =>
      new Howl({
        src: [require("../components/audio/pop-sound.mp3")],
        html5: true,
        volume: 1,
        rate: 5,
      }),
    []
  );
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="black"
        row
        name="radio-buttons-group"
        value={color}
        onChange={(e) => (setColor(e.target.value), popSound.play())}
      >
        <FormControlLabel
          value="black"
          control={
            <Radio
              sx={{
                color: "black",
                "&.Mui-checked": {
                  color: "black",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: 50,
                },
              }}
            />
          }
        />
        <FormControlLabel
          value="red"
          control={
            <Radio
              sx={{
                color: "red",
                "&.Mui-checked": {
                  color: "red",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: 50,
                },
              }}
            />
          }
        />
        <FormControlLabel
          value="orange"
          control={
            <Radio
              sx={{
                color: "orange",
                "&.Mui-checked": {
                  color: "orange",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: 50,
                },
              }}
            />
          }
        />

        <FormControlLabel
          value="green"
          control={
            <Radio
              sx={{
                color: "green",
                "&.Mui-checked": {
                  color: "green",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: 50,
                },
              }}
            />
          }
        />
        <FormControlLabel
          value="blue"
          control={
            <Radio
              sx={{
                color: "blue",
                "&.Mui-checked": {
                  color: "blue",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: 50,
                },
              }}
            />
          }
        />
      </RadioGroup>
    </FormControl>
  );
}
