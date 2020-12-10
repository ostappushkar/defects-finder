import React from 'react';
import { connect } from 'react-redux';
import {ipcRenderer} from 'electron';
import {
  loadEtalon,
  loadPattern,
  setKCount,
  setThreshold,
  restoreOriginal,
  saveResult,
  imageClusterize,
  imageThreshold,
  imageHistogram,
  imageGrayscale,
  imageHistogramClusterized,
  recognizeDefects,
} from '../actions';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import MenuItem from '@material-ui/core/MenuItem';
import RestoreRoundedIcon from '@material-ui/icons/RestoreRounded';
import PlayCircleFilledWhiteRoundedIcon from '@material-ui/icons/PlayCircleFilledWhiteRounded';
import ImageIcon from '@material-ui/icons/Image';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import SearchIcon from '@material-ui/icons/Search';
import { Slider } from '@material-ui/core';

const Main = (props) => {
  const {
    loadEtalon,
    loadPattern,
    etalon,
    pattern,
    clusterized,
    threshold,
    kCount,
    setKCount,
    setThreshold,
    restoreOriginal,
    saveResult,
    imageClusterize,
    imageHistogram,
    imageGrayscale,
    imageThreshold,
    imageHistogramClusterized,
    recognizeDefects,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClusterize = () => {
    imageClusterize();
  };
  const handleRestore = () => {
    restoreOriginal();
    handleClose();
  };
  const handleThresholdChange = (event, value) => {
    setThreshold(value);
  };
  const handleBinary = () => {
    imageThreshold();
  };

  const handleGrayscale = () => {
    imageGrayscale();
  };

  const handleHistogram = () => {
    imageHistogram();
  };
  const handleHistogramCluster = () => {
    imageHistogramClusterized();
  };
  const handleKCountChange = (event) => {
    setKCount(event.target.value);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFindDefects = () =>{
    recognizeDefects();
    ipcRenderer.send('open-result');
  }
  const handleSave = () => {
    saveResult();
    handleClose();
  };
  console.log(!etalon || !pattern || !clusterized);
  return (
    <div className="main-container">
      <AppBar color="inherit" position="fixed">
        <Toolbar className="navbar-main" variant="dense">
          <div className="navbar-actions">
            <div className="threshold-wrapper">
              <Typography className="k-label">Threshold:</Typography>
              <Slider
                track={false}
                disabled={!etalon || !pattern}
                value={threshold}
                aria-labelledby="Threshold"
                marks
                valueLabelDisplay="auto"
                onChange={handleThresholdChange}
                step={1}
                min={1}
                max={255}></Slider>
              <IconButton onClick={handleBinary} disabled={!etalon || !pattern} aria-label="delete">
                <PlayCircleFilledWhiteRoundedIcon />
              </IconButton>
            </div>
            <Typography className="k-label">Cluster count:</Typography>
            <Select
              disabled={!etalon || !pattern}
              labelId="k-count"
              id="k-count"
              value={kCount}
              onChange={handleKCountChange}>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
            <Button
              variant="contained"
              type="button"
              onClick={handleClusterize}
              disabled={!etalon || !pattern}
              className="clusterize-btn">
              Clusterize
            </Button>
            <Button
              variant="contained"
              type="button"
              onClick={handleHistogram}
              disabled={!etalon || !pattern}
              className="clusterize-btn">
              Histogram
            </Button>
            <Button
              variant="contained"
              type="button"
              onClick={handleHistogramCluster}
              disabled={!etalon || !pattern || !clusterized}
              className="clusterize-btn">
              Histogram Clusterized
            </Button>
            <Button
              variant="contained"
              type="button"
              onClick={handleGrayscale}
              disabled={!etalon || !pattern}
              className="clusterize-btn">
              Grayscale
            </Button>
            <IconButton
              className="menu-btn"
              color="inherit"
              onClick={handleMenuOpen}
              aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem className="input-menuitem">
                <label id="input-label" htmlFor="upload-etalon">
                  <ListItemIcon>
                    <ImageIcon fontSize="small" />
                  </ListItemIcon>
                  <input
                    hidden
                    onChange={(event) => {
                      loadEtalon(event.target.files);
                      handleClose();
                    }}
                    id="upload-etalon"
                    type="file"
                    accept=".jpg, .jpeg, .png, .bmp"></input>
                  Open etalon
                </label>
              </MenuItem>
              <MenuItem className="input-menuitem">
                <label id="input-label" htmlFor="upload-pattern">
                  <ListItemIcon>
                    <BrokenImageIcon fontSize="small" />
                  </ListItemIcon>
                  <input
                    hidden
                    onChange={(event) => {
                      loadPattern(event.target.files);
                      handleClose();
                    }}
                    id="upload-pattern"
                    type="file"
                    accept=".jpg, .jpeg, .png, .bmp"></input>
                  Open pattern
                </label>
              </MenuItem>
              <MenuItem disabled={!etalon || !pattern} onClick={handleSave}>
                <ListItemIcon>
                  <SaveRoundedIcon fontSize="small" />
                </ListItemIcon>
                Save image
              </MenuItem>
              <MenuItem disabled={!etalon || !pattern} onClick={handleRestore}>
                <ListItemIcon>
                  <RestoreRoundedIcon fontSize="small" />
                </ListItemIcon>
                Restore original
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <div className="canvas-content">
        <Card className="canvas-card">
          <CardContent>
            <img id="image" src={etalon} />
          </CardContent>
        </Card>
        <Card className="canvas-card">
          <CardContent>
            <img id="image" src={pattern} />
          </CardContent>
        </Card>
      </div>
      {etalon && pattern && <Fab onClick={handleFindDefects} color="primary" variant="extended">
        <SearchIcon/>
        Find defects
      </Fab>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    image: state.image,
    kCount: state.kCount,
    proceededImage: state.proceededImage,
    threshold: state.threshold,
    histogramData: state.histogramData,
    cumulativeData: state.cumulativeData,
    cumulativeClusterizedData: state.cumulativeClusterizedData,
    clusterized: state.clusterized,
    etalon: state.etalon,
    pattern: state.pattern,
  };
};

const mapDispatchToProps = {
  loadEtalon,
  loadPattern,
  setKCount,
  setThreshold,
  restoreOriginal,
  saveResult,
  imageClusterize,
  imageThreshold,
  imageGrayscale,
  imageHistogram,
  imageHistogramClusterized,
  recognizeDefects,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
