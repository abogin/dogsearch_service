import React, { useState, useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"

import _ from "lodash"

import { styled } from "@mui/material/styles"

import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Hidden from "@mui/material/Hidden"

import { addNewImage } from "features/images/slice"

const Input = styled("input")({
  display: "none",
})

const UploadPage = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState(null)
  const [filename, setFilename] = useState("")
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={4} implementation="css" smDown component={Hidden} />
        <Grid item xs={12} md={4}>
          <TextField
            id="contained-button-file"
            type="file"
            inputProps={{ accept: "image/*" }}
            value={filename}
            onChange={(e) => {
              console.log(e.target.files)
              setData(e.target.files[0])
              setFilename(e.target.value)
            }}
            fullWidth
          />
        </Grid>
        <Grid item md={4} implementation="css" smDown component={Hidden} />
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            disabled={!data}
            onClick={() => {
              dispatch(addNewImage(data))
              setData(null)
              setFilename("")
            }}
          >
            Upload
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default UploadPage
