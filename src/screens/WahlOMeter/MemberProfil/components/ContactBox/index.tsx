import React from 'react';
import styled from 'styled-components/native';
import { linking } from '../../../../../lib/linking';
import { Contacts } from '../..';
import SvgMail from 'assets/svgs/icons/Mail';
import SvgFacebook from 'assets/svgs/icons/Facebook';
import SvgTwitter from 'assets/svgs/icons/Twitter';
import SvgInstagram from 'assets/svgs/icons/Instagram';
import SvgPlanet from 'assets/svgs/icons/Planet';

const ContactWrapper = styled.View`
  flex-wrap: wrap;
  padding-top: 18;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;

const IconWrapper = styled.TouchableOpacity`
  width: 65;
  height: 65;
  border-width: 2;
  border-radius: 33;
  justify-content: center;
  align-items: center;
`;

const ServiceWrapper = styled.View`
  align-items: center;
  flex: 1;
  min-width: 80;
  max-width: 200;
  height: 100;
`;

const Domain = styled.Text`
  font-size: 12;
  padding-top: 5;
`;

const Username = styled.Text`
  font-size: 12;
  padding-top: 5;
`;

interface Props {
  contacts: Contacts[];
}

class ContactBox extends React.PureComponent<Props> {
  getIcon = ({
    name,
    url,
    username,
  }: {
    name: string;
    url: string;
    username?: string;
  }) => {
    switch (name) {
      case 'email': {
        const email = `mailto:${url}`;
        return (
          <ServiceWrapper key={url}>
            <IconWrapper onPress={linking(email)}>
              <SvgMail width={40} height={40} color="#000" />
            </IconWrapper>
          </ServiceWrapper>
        );
      }

      case 'facebook':
      case 'Facebook':
        return (
          <ServiceWrapper key={url}>
            <IconWrapper onPress={linking(url)}>
              <SvgFacebook width={40} height={40} color="#000" />
            </IconWrapper>
            {!!username && <Username>{username}</Username>}
          </ServiceWrapper>
        );
      case 'twitter':
      case 'Twitter':
        return (
          <ServiceWrapper key={url}>
            <IconWrapper onPress={linking(url)}>
              <SvgTwitter width={40} height={40} color="#000" />
            </IconWrapper>
            {!!username && <Username>{username}</Username>}
          </ServiceWrapper>
        );
      case 'instagram':
      case 'Instagram':
        return (
          <ServiceWrapper key={url}>
            <IconWrapper onPress={linking(url)}>
              <SvgInstagram width={40} height={40} color="#000" />
            </IconWrapper>
            {!!username && <Username>{username}</Username>}
          </ServiceWrapper>
        );

      default:
        return (
          <ServiceWrapper key={url}>
            <IconWrapper onPress={linking(url)}>
              <SvgPlanet width={40} height={40} color="#000" />
            </IconWrapper>
            <Domain>{name}</Domain>
          </ServiceWrapper>
        );
    }
  };

  render() {
    const { contacts } = this.props;
    return (
      <ContactWrapper>
        {contacts.map(({ name, URL, username }) =>
          this.getIcon({ name, url: URL, username }),
        )}
      </ContactWrapper>
    );
  }
}

export default ContactBox;
