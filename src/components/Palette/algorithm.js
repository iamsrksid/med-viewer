import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, MenuList, Button } from "@chakra-ui/react";
import { updateActiveDrawerTool } from "../../reducers/drawerReducer";
import { MenuAltButton, MenuAltItem } from "../altButton";

const Algorithm = () => {
  const { activeDrawerTool } = useSelector((state) => state.drawerState);
  const isActive = activeDrawerTool === "Algorithm";
  const dispatch = useDispatch();

  const handleBasicPalette = () => {
    dispatch(updateActiveDrawerTool({ tool: "Algorithm" }));
  };

  return (
    <>
      <Menu>
        <MenuAltButton as={Button} color="white" label="Select Algorithm" />
        <MenuList
          mt={-2}
          p={0}
          py={2}
          backgroundColor="#EAEAEA"
          fontSize="sm"
          zIndex="2"
          minW={0}
          color="#3965C6"
        >
          <MenuAltItem label="Basic Palette" onClick={handleBasicPalette} />
        </MenuList>
      </Menu>
    </>
  );
};

export default Algorithm;
