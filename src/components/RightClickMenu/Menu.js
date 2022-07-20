import React, { forwardRef } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Portal,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const DisplayMenu = forwardRef((props, ref) => (
  <Menu>
    <MenuButton ref={ref} {...props}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text>Display</Text>
        <ChevronRightIcon />
      </Flex>
    </MenuButton>
    <Portal>
      <MenuList
        pos="relative"
        left="222px"
        bottom="46px"
        borderRadius={0}
        bgColor="#FCFCFC"
        p={0}
      >
        <MenuGroup title="Brightness/Contrast" fontWeight={400}>
          <MenuItem _hover={{ bgColor: "#DEDEDE" }}>400%</MenuItem>
          <MenuItem _hover={{ bgColor: "#DEDEDE" }}>100%</MenuItem>
          <MenuItem _hover={{ bgColor: "#DEDEDE" }}>50%</MenuItem>
          <MenuItem _hover={{ bgColor: "#DEDEDE" }}>10%</MenuItem>
          <MenuItem _hover={{ bgColor: "#DEDEDE" }}>1%</MenuItem>
        </MenuGroup>
      </MenuList>
    </Portal>
  </Menu>
));

const SetTagMenu = forwardRef((props, ref) => (
  <Menu>
    <MenuButton ref={ref} {...props}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text>Set Tag</Text>
        <ChevronRightIcon />
      </Flex>
    </MenuButton>
    <Portal>
      <MenuList
        pos="relative"
        left="222px"
        bottom="46px"
        borderRadius={0}
        bgColor="#FCFCFC"
        p={0}
      >
        <MenuOptionGroup fontWeight={400} type="checkbox">
          <MenuItemOption
            _hover={{ bgColor: "#DEDEDE" }}
            value="none"
            closeOnSelect={false}
          >
            None
          </MenuItemOption>
          <MenuItemOption
            _hover={{ bgColor: "#DEDEDE" }}
            value="tumor"
            closeOnSelect={false}
          >
            Tumor
          </MenuItemOption>
          <MenuItemOption
            _hover={{ bgColor: "#DEDEDE" }}
            value="stroma"
            closeOnSelect={false}
          >
            Stroma
          </MenuItemOption>
          <MenuItemOption
            _hover={{ bgColor: "#DEDEDE" }}
            value="immunecells"
            closeOnSelect={false}
          >
            Immune cells
          </MenuItemOption>
          <MenuItemOption
            _hover={{ bgColor: "#DEDEDE" }}
            value="necrosis"
            closeOnSelect={false}
          >
            Necrosis
          </MenuItemOption>
          <MenuItemOption
            _hover={{ bgColor: "#DEDEDE" }}
            value="other"
            closeOnSelect={false}
          >
            Other
          </MenuItemOption>
          <MenuItemOption
            _hover={{ bgColor: "#DEDEDE" }}
            value="addnewtags"
            closeOnSelect={false}
          >
            Add new Tags
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Portal>
  </Menu>
));

export const CustomMenu = () => {
  return (
    <Menu>
      <MenuButton as={Button}>Actions</MenuButton>
      <Portal>
        <MenuList
          borderRadius={0}
          bgColor="#FCFCFC"
          p={0}
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.15)"
        >
          <MenuItem
            _hover={{ bgColor: "#DEDEDE" }}
            as={DisplayMenu}
            closeOnSelect={false}
          />
          <MenuItem
            _hover={{ bgColor: "#DEDEDE" }}
            as={SetTagMenu}
            closeOnSelect={false}
          />
          <MenuItem _hover={{ bgColor: "#DEDEDE" }}>Morphometry</MenuItem>
          <MenuItem _hover={{ bgColor: "#DEDEDE" }}>Edit</MenuItem>
          <MenuItem _hover={{ bgColor: "#DEDEDE" }}>Edit</MenuItem>
          <MenuDivider />
          <MenuItem _hover={{ bgColor: "#DEDEDE" }}>Lock</MenuItem>
          <MenuItem _hover={{ bgColor: "#DEDEDE" }}>Delete Object</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};
