import React, { useState } from "react";
import {
  Container,
  Header,
  Logo,
  Title,
  MenuContainer,
  MenuItemLink,
  MenuItemButton,
  ToogleMenu,
} from "./styles";
import logo from "../../assets/logo.svg";
import { menuItems } from "../../utils";
import {
  FaBoxOpen,
  FaBoxes,
  FaClipboardList,
  FaInbox,
  FaSignOutAlt,
  FaRegLifeRing,
} from "react-icons/fa";
import { MdClose, MdMenu } from "react-icons/md";
import { useAuth } from "../../hooks/auth";

const Aside = () => {
  const { signOut } = useAuth();
  const [showToggleMenu, setShowToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowToggleMenu(!showToggleMenu);
  };

  const renderIcon = (itemIcon) => {
    if (itemIcon === "FaBoxOpen") {
      return <FaBoxOpen />;
    } else if (itemIcon === "FaClipboardList") {
      return <FaClipboardList />;
    } else if (itemIcon === "FaBoxes") {
      return <FaBoxes />;
    } else if (itemIcon == "FaInbox") {
      return <FaInbox />
    }
    return <FaRegLifeRing />;
  };

  return (
    <Container menuIsOpen={showToggleMenu}>
      <Header>
        <ToogleMenu onClick={() => handleToggleMenu()}>
          {showToggleMenu ? <MdClose /> : <MdMenu />}
        </ToogleMenu>
        <Logo src={logo} alt="Logo afiliado" />
        <Title>Afiliado Adm</Title>
      </Header>
      <MenuContainer>
        {menuItems &&
          menuItems.length > 0 &&
          menuItems.map((item, index) => (
            <MenuItemLink href={item.link} key={index}>
              {renderIcon(item.icon)}
              {item.name}
            </MenuItemLink>
          ))}
        <MenuItemButton onClick={signOut}>
          <FaSignOutAlt />
          Sair
        </MenuItemButton>
      </MenuContainer>
    </Container>
  );
};

export default Aside;
