import React, { ComponentProps } from 'react';
import { faqData } from './data';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MarkdownView } from 'react-native-markdown-view';
import { Linking, Platform } from 'react-native';
import styled from 'styled-components/native';
import deepmerge from 'deepmerge';
import { CompositeNavigationProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { SidebarNavigatorParamList } from 'navigation/Sidebar';
import { RootStackParamList } from 'navigation';
import Folding from 'components/Folding';
import { linking } from 'lib/linking';
import SvgPhone from 'assets/svgs/icons/Phone';
import SvgMail from 'assets/svgs/icons/Mail';
import SvgPlanet from 'assets/svgs/icons/Planet';
import SvgGithub from 'assets/svgs/icons/Github';
import SvgTwitter from 'assets/svgs/icons/Twitter';
import SvgFacebook from 'assets/svgs/icons/Facebook';
import SvgInstagram from 'assets/svgs/icons/Instagram';
import SvgYoutube from 'assets/svgs/icons/Youtube';
import SvgDiscord from 'assets/svgs/icons/Discord';
import { Button } from 'components/Botton';
import { MadeWithLove } from 'components/MadeWithLove';

const phoneNumber =
  Platform.OS === 'ios'
    ? `telprompt:${'+4917647040213'}`
    : `tel:${'+4917647040213'}`;
const email = `mailto:${'contact@democracy-deutschland.de'}`;
const github = 'https://github.com/demokratie-live/democracy-client/issues/';
const facebook = 'https://www.facebook.com/democracygermany/';
const twitter = 'https://twitter.com/democracy_de';
const instagram = 'https://www.instagram.com/democracy_deutschland/';
const youtube = 'https://www.youtube.com/channel/UC2R4cGTq1LjFZ2DvDaVhDyg';
const discord = 'https://discord.gg/Pdu3ZEV';
const website = 'https://www.democracy-deutschland.de/';

const Wrapper = styled.ScrollView.attrs({
  scrollIndicatorInsets: { right: 1 }, // TODO do cleanfix when there is a correct solution (already closed but not solved without workaround) https://github.com/facebook/react-native/issues/26610
})`
  /* padding-horizontal: 18; */
`;

const Headline = styled.Text`
  padding-horizontal: 18;
  padding-vertical: 18;
  color: grey;
  font-size: 15;
`;

const ContactWrapper = styled.View`
  width: 100%;
  align-self: center;
  flex-direction: row;
  justify-content: space-between;
  max-width: 300;
`;

const SocialMediaWrapper = styled.View`
  padding-top: 25;
  align-self: center;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  max-width: 300;
`;

const IconWrapper = styled.TouchableOpacity`
  width: 65;
  height: 65;
  border-width: 2;
  border-radius: 33;
  justify-content: center;
  align-items: center;
`;

const Spacer = styled.View`
  padding-bottom: 36;
`;

interface MarkdownProps {
  styles?: ComponentProps<typeof MarkdownView>['styles'];
}

const Markdown: React.FC<MarkdownProps> = ({ children, styles = {} }) => {
  const markdownStyles = deepmerge(
    {
      paragraph: {
        color: '#555',
        ...(styles.paragraph || []),
      },
    },
    styles,
  );

  return (
    <MarkdownView
      style={{ paddingHorizontal: 18 }}
      styles={markdownStyles}
      onLinkPress={(url: string) => {
        Linking.openURL(url).catch((error) =>
          console.warn('An error occurred: ', error),
        );
      }}>
      {children}
    </MarkdownView>
  );
};

type FaqScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<SidebarNavigatorParamList, 'Faq'>,
  StackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: FaqScreenNavigationProp;
};

export const FaqScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Wrapper>
      <Headline>Hier beantworten wir häufig gestellte Fragen</Headline>
      {faqData.map(({ title, text }) => (
        <Folding title={title} key={title}>
          <Markdown>{text}</Markdown>
        </Folding>
      ))}
      <Spacer />
      <Markdown
        styles={{
          paragraph: {
            fontSize: 15,
          },
        }}>{`Ist noch etwas unklar? Der DEMOCRACY Support steht Dir bei Fragen zur Seite.

Du möchtest einen Fehler melden?

Bitte gib uns möglichst viele Informationen zu den von Dir gefunden Fehlern oder Verbesserungsvorschlägen.

Übermittele uns daher immer einen Screenshot, eine kurze Fehlerbeschreibung sowie Deine Plattform (iOS/Android) und Deine Gerätebezeichnung (z.B. iPhone SE), damit wir Dir schnellstmöglich helfen können. 
`}</Markdown>
      <Spacer />
      <ContactWrapper>
        <IconWrapper onPress={linking(phoneNumber)}>
          <SvgPhone color="#000" width={30} height={30} />
        </IconWrapper>
        <IconWrapper onPress={linking(email)}>
          <SvgMail color="#000" width={30} height={30} />
        </IconWrapper>
        <IconWrapper onPress={linking(website)}>
          <SvgPlanet color="#000" width={30} height={30} />
        </IconWrapper>
      </ContactWrapper>
      <SocialMediaWrapper>
        <IconWrapper onPress={linking(github)}>
          <SvgGithub color="#000" width={30} height={30} />
        </IconWrapper>
        <IconWrapper onPress={linking(twitter)}>
          <SvgTwitter color="#000" width={30} height={30} />
        </IconWrapper>
        <IconWrapper onPress={linking(facebook)}>
          <SvgFacebook color="#000" width={30} height={30} />
        </IconWrapper>
      </SocialMediaWrapper>
      <SocialMediaWrapper>
        <IconWrapper onPress={linking(instagram)}>
          <SvgInstagram color="#000" width={30} height={30} />
        </IconWrapper>
        <IconWrapper onPress={linking(youtube)}>
          <SvgYoutube color="#000" width={30} height={30} />
        </IconWrapper>
        <IconWrapper onPress={linking(discord)}>
          <SvgDiscord color="#000" width={30} height={30} />
        </IconWrapper>
      </SocialMediaWrapper>
      <Button
        text="Tutorial erneut ansehen"
        onPress={() => navigation.navigate('Instructions')}
        // backgroundColor=""
        textColor="blue"
      />
      <Spacer />
      <MadeWithLove />
    </Wrapper>
  );
};
