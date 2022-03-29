import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useZoom } from "use-open-seadragon";
import PropTypes from "prop-types";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
    Button,
    Box,
    Input,
    Menu,
    MenuList,
    MenuButton,
    MenuDivider,
    MenuItem,
    useMenuItem,
    Select
} from "@chakra-ui/react";
import { updateZoomValue } from "../../state/reducers/zoomReducer";
 
const ZoomLevels = () => {
    const { viewer } = useSelector((state) => state.fabricOverlayState);
    const { zoomIn, zoomOut } = useZoom();
    const { zoomValue } = useSelector((state) => state.zoomState);
    const dispatch = useDispatch();
 
    const handleChange = (e) => {
        if (e.target.value < 0 || e.target.value >= 100) return;
        viewer.viewport.zoomTo(viewer.viewport.getMaxZoom() * e.target.value * 0.01);
        dispatch(updateZoomValue(e.target.value));
    }
 
    const handleZoomIn = (e) => {
        try {
            if (viewer.viewport.getMaxZoom() > viewer.viewport.getZoom()) {
                zoomIn();
            }
        } catch (e) {
            console.error("Error handling Zoom In button click", e);
        }
    };
 
    const handleZoomOut = (e) => {
        try {
            if (viewer.viewport.getMinZoom() < viewer.viewport.getZoom()) {
                zoomOut();
            }
        } catch (e) {
            console.error("Error handling Zoom Out button click", e);
        }
    };
 
    const handleZoomLvl = (e, lvl) => {
        viewer.viewport.zoomTo(viewer.viewport.getMaxZoom() * lvl * 0.01)
    };
 
    const navigationKeys = ['ArrowUp', 'ArrowDown', 'Escape'];
    const MenuInput = props => {
        const { role } = useMenuItem(props);
        return (
            <Box px="3" py="3" role={role}>
                <Input
                    size="sm"
                    onKeyPress={e => {
                        if (e.key == "Enter") {
                            handleChange(e);
                        }
                    }}
                    onKeyDown={e => {
                        if (!navigationKeys.includes(e.key)) {
                            e.stopPropagation();
                        }
                    }}
                />
            </Box>
        );
    };
 
    return (
        <Menu closeOnSelect={false}>
            <MenuButton
                as={Button}
                size="sm"
                backgroundColor="#151515"
                rightIcon={<RiArrowDropDownLine size="20px" />}
                marginLeft="10px"
                _expanded={{ background: "#313131" }}
                _focus={{ border: "none" }}
                _hover={{ background: "#313131" }}
            >
                {zoomValue}%
            </MenuButton>
            <MenuList backgroundColor="#151515" fontSize="13px" zIndex="2">
                <MenuInput />
                <MenuItem
                    size="20px"
                    onClick={handleZoomIn}
                    _hover={{ background: "#313131" }}
                >
                    Zoom In
                </MenuItem>
                <MenuItem
                    size="20px"
                    onClick={handleZoomOut}
                    _hover={{ background: "#313131" }}
                >
                    Zoom Out
                </MenuItem>
                <MenuDivider />
                <MenuItem
                    size="20px"
                    onClick={(e) => handleZoomLvl(e, 25)}
                    _hover={{ background: "#313131" }}
                >
                    Zoom 25%
                </MenuItem>
                <MenuItem
                    size="20px"
                    onClick={(e) => handleZoomLvl(e, 50)}
                    _hover={{ background: "#313131" }}
                >
                    Zoom 50%
                </MenuItem>
                <MenuItem
                    size="20px"
                    onClick={(e) => handleZoomLvl(e, 75)}
                    _hover={{ background: "#313131" }}
                >
                    Zoom 75%
                </MenuItem>
                <MenuItem
                    size="20px"
                    onClick={(e) => handleZoomLvl(e, 100)}
                    _hover={{ background: "#313131" }}
                >
                    Zoom 100%
                </MenuItem>
            </MenuList>
        </Menu>
    );
};
 
export default ZoomLevels;