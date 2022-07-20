import React from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import UndoRedo from "../UndoRedo/undoredo";
import RemoveObject from "../removeComponents";
import { CustomMenu } from "../RightClickMenu/Menu";

const ActionsToolbar = ({ viewerId, saveAnnotationsHandler }) => {
  return (
    <Flex
      borderX="2px solid #E4E5E8"
      height="18px"
      alignItems="center"
      flex="1"
    >
      <UndoRedo viewerId={viewerId} />
      {/* <CustomMenu /> */}
      {/* <RemoveObject
        viewerId={viewerId}
        saveAnnotationsHandler={saveAnnotationsHandler}
      /> */}
      <Spacer />
    </Flex>
  );
};

export default ActionsToolbar;
