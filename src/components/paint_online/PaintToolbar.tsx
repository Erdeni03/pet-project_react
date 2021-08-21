import React, {useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import CheckBoxOutlineBlankSharpIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp';
import RadioButtonUncheckedSharpIcon from '@material-ui/icons/RadioButtonUncheckedSharp';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import BrushIcon from '@material-ui/icons/Brush';
import FormatPaintSharpIcon from '@material-ui/icons/FormatPaintSharp';
import MenuIcon from '@material-ui/icons/Menu';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import Brush from "./tools/Brush";
import Rect from "./tools/Rect";
import Circle from "./tools/Circle";
import Eraser from "./tools/Eraser";
import Line from "./tools/Line";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        bg: {
            background: 'black',
        },
        toolbar: {
            minHeight: 40
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        mr: {
            marginLeft: 'auto'
        },
        title: {
            flexGrow: 1,
        },
        inputThickness: {
            marginLeft: 60,
            width: 100
        }
    }),
);

export default function PaintToolbar() {
    const classes = useStyles();

    const {canvas, sessionId, socket} = useTypedSelector(state => state.paintCanvas)
    const {setTool, setLineWidth, setFillColor, setStrokeColor, undo,redo} = useActions()


    const changeColor = (e:any)=> {
        setStrokeColor(e.target.value)
        setFillColor(e.target.value)
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.bg}>
                <Toolbar className={classes.toolbar}>
                    <IconButton onClick={() => setTool(new Brush(canvas, socket, sessionId))} edge="start" className={classes.menuButton}
                                color="inherit" aria-label="menu">
                        <BrushIcon/>
                    </IconButton>
                    <IconButton onClick={() => setTool(new Rect(canvas))} edge="start" className={classes.menuButton}
                                color="inherit" aria-label="menu">
                        <CheckBoxOutlineBlankSharpIcon/>
                    </IconButton>
                    <IconButton onClick={() => setTool(new Circle(canvas))} edge="start" className={classes.menuButton}
                                color="inherit" aria-label="menu">
                        <RadioButtonUncheckedSharpIcon/>
                    </IconButton>
                    <IconButton onClick={() => setTool(new Eraser(canvas))} edge="start" className={classes.menuButton}
                                color="inherit" aria-label="menu">
                        <FormatPaintSharpIcon/>
                    </IconButton>
                    <IconButton onClick={() => setTool(new Line(canvas))} edge="start" className={classes.menuButton}
                                color="inherit" aria-label="menu">
                        <LinearScaleIcon/>
                    </IconButton>
                    <input onChange={e => changeColor(e)} type="color"/>
                    <input
                        onChange={e => setLineWidth(e.target.value)}
                        type="number"
                        placeholder='Толщина'
                        className={classes.inputThickness}
                        defaultValue={1}
                        min={1}
                        max={50}/>

                    <IconButton onClick={ ()=> undo() } edge="start" className={classes.menuButton && classes.mr} color="inherit"
                                aria-label="menu">
                        <SubdirectoryArrowLeftIcon/>
                    </IconButton>
                    <IconButton onClick={ ()=> redo() } edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <SubdirectoryArrowRightIcon/>
                    </IconButton>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <SaveIcon/>
                    </IconButton>

                </Toolbar>
            </AppBar>
        </div>
    );
}