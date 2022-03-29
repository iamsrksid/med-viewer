import React from "react";
import UndoRedo from "../UndoRedo/undoredo";
import { Flex, Spacer } from "@chakra-ui/react";
import RemoveObject from "../removeComponents";

function ActionsToolbar({ viewerId }) {
  return (
    <Flex
      borderX="2px solid #E4E5E8"
      height="18px"
      alignItems="center"
      flex="1"
    >
      <UndoRedo viewerId={viewerId} />
      <RemoveObject viewerId={viewerId} />
      <Spacer />
    </Flex>
  );
}

export default ActionsToolbar;
