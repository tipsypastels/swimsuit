import React, { useReducer } from 'react';

import Section from './Section';
import Project from './Project';
import PhotoModal from './PhotoModal';

import pc3Img from './images/pc3.png';
import pc3Img2 from './images/pc3_2.png';
import pc3Img3 from './images/pc3_3.png';

import fghImg from './images/fgh.png';
import fghImg2 from './images/fgh_2.png';
import fghImg3 from './images/fgh_3.png';

import './App.scss';
import './fa/css/all.min.scss';

const STARTING_YEAR = 2019;
const CURRENT_YEAR = new Date().getFullYear();

type State = {
  photoIndex: number;
  photoList: string[];
}

type Action =
  | { type: 'next' }
  | { type: 'prev' }
  | { type: 'open', photos: string[] }
  | { type: 'close' }

function reducer(state: State, action: Action) {
  switch(action.type) {
    case 'next': return {
      ...state,
      photoIndex: (state.photoIndex + 1) % state.photoList.length,
    }
    case 'prev': return {
      ...state,
      photoIndex: (state.photoIndex - 1 + state.photoList.length) % state.photoList.length,
    }
    case 'open': return {
      photoIndex: 0,
      photoList: action.photos,
    }
    case 'close': return {
      photoIndex: null,
      photoList: null,
    }
    default: return state;
  }
}

export type PhotoState  = State;
export type PhotoAction = Action;

export default function App() {
  const [photoState, photoDispatch] = useReducer(reducer, {
    photoIndex: null, photoList: null,
  });

  return (
    <div className="App">
      <PhotoModal
        photoState={photoState}
        photoDispatch={photoDispatch}
      />

      <div className="Page">
        <div className="title-bar">
          <div className="title-bar__name">
            Dakota Sankey
          </div>

          <div className="title-bar__spacer" />

          <nav className="title-bar__nav">
            <a href="https://github.com/tipsypastels">
              Github
            </a>

            <a href="https://twitter.com/tipsypastels">
              Twitter
            </a>
          </nav>
        </div>
        
        <Section title="About" color="sweetness">
          a
        </Section>

        <Section title="Web Development" color="sexercise">
          <Project 
            title="PokéCommunity" 
            site="https://pokecommunity.com"
            techs={['php', 'html', 'scss', 'javascript']}
          >
            PokéCommunity is a popular unofficial forum for fans of the Pokémon franchise. It uses a heavily modified version of the PHP-based <a href="https://www.vbulletin.com/">vBulletin</a> forum software, although a rewritten version using React and <a href="https://koajs.com/">Koa.js</a> is currently being developed (see the section below). My role on the site is the leader of a volunteer team of developers, working to add new features and modernize the look and feel of the site.
          </Project>

          <Project 
            title="PokéCommunity3" 
            github="https://github.com/thepokecommunity/pokecommunity-react"
            techs={['react', 'typescript', 'javascript', 'koajs', 'scss']}
            photos={{
              list: [pc3Img, pc3Img2, pc3Img3],
              dispatch: photoDispatch,
            }}
          >
            PokéCommunity3 is a rewritten version of PokéCommunity using a modern React codebase. For the server it uses an external API powered by Koa.js, and both ends of the app are also written in Typescript. The project is currently in development and has not yet been released.
          </Project>

          <Project
            title="Safari Zine"
            github="https://github.com/tipsypastels/safari-zine-theme"
            techs={['wordpress', 'php', 'html', 'scss', 'javascript']}
          >
            Safari Zine is a Wordpress theme I created for a Pokémon fan magazine. Though the magazine no longer exists, you can view an archived version at the link below. The theme also makes use of Wordpress's plugin API to create several custom features, such as new articles automatically being posted to the site's forums.
          </Project>

          <Project
            title="Fangame Hacktory"
            github="https://github.com/tipsypastels/fgh4"
            techs={['rails', 'javascript', 'jquery', 'stimulusjs', 'scss']}
            photos={{
              list: [fghImg, fghImg2, fghImg3],
              dispatch: photoDispatch,
            }}
          >
            Fangame Hacktory is a small site for the creators of fan-made games and <a href="https://en.wikipedia.org/wiki/ROM_hacking">ROM Hacks</a> to post content. It uses mostly vanilla Rails architecture, with no front-end framework, though it still manages plenty of client-side functionality through the lightweight use of <a href="https://stimulusjs.org/">Stimulus.js</a>.
          </Project>

          <Project
            title="ML"
            github="https://github.com/tipsypastels/ml"
            techs={['rails', 'react', 'websockets', 'javascript', 'scss']}
          >
            ML is a mostly experimental forum software written in Ruby on Rails, and using React for certain particularly interactive pages. It supports classical forum features like threading, user-created groups, and advanced permissions control, but also uses websockets to create an experience reminiscent of a chatroom - messages appear in real time and users are notified of who's typing. The project is incomplete and currently on the back burner.
          </Project>

          <Project
            title="Swimsuit"
            github="https://github.com/tipsypastels/swimsuit"
            techs={['react', 'typescript', 'scss']}
          >
            My website! You are here. I'm not really sure why I named it that.
          </Project>
        </Section>

        <Section title="Discord Bots" color="spraypaint">
          <Project 
            title="Porygon"
            techs={['javascript', 'discordjs']}
          >
            Porygon is a powerful general-purpose Discord bot. It was originally conceived as a fork of <a href="https://gawesomebot.com/">AwesomeBot</a>, a popular open source bot. Later, I rewrote it from scratch. It features quote saving, user-created profiles, moderation and admin tools, custom permission groups, points for messages, and many everyday useful commands.
          </Project>

          <Project
            title="Whismur"
            github="https://github.com/tipsypastels/whismur"
            techs={['ruby', 'discordrb']}
          >
            Whismur is a bot inspired by the popular online <a href="https://brantsteele.net/hungergames/disclaimer.php">Hunger Games simulator</a>, in which you enter the names of 24 people or characters and get a simulated description of how a Hunger Game including them could play out. The bot works similarly, though there is no limit on the number of players.
          </Project>
        </Section>

        <Section title="Other Projects" color="swimsuit">
          <Project
            title="Pokémon Gnosis"
            github="https://github.com/tipsypastels/pokegnosis"
            techs={['c', 'c++', 'ruby', 'make']}
          >
            Pokémon Gnosis is a ROM Hack of the game <a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Emerald_Version">Pokémon Emerald</a> by Game Freak & Nintendo. The game uses the engine and mechanics of Emerald while creating an entirely new story set in a new world. It is currently in early development, and is mostly an excuse for me to practice with C.
          </Project>

          <Project
            title="Dragonsbreath"
            github="https://github.com/tipsypastels/dragonsbreath"
            techs={['typescript', 'javascript', 'jest']}
          >
            Dragonsbreath is a small complementary project to Pokémon Gnosis - an intuitive scripting language for creating events, cutscenes, and other story elements during the game, which is then compiled into the game's much less intuitive native scripting language. See the README on GitHub for an example.
          </Project>
        </Section>

        <Section title="Skills" color="sympathy">
          
        </Section>
      </div>

      <div className="Footer">
        {CURRENT_YEAR === STARTING_YEAR
          ? (
            <>&copy; {STARTING_YEAR}</>
          ) : (
            <>&copy; {STARTING_YEAR}—{CURRENT_YEAR}</>
          ) 
        } Dakota Sankey
      </div>
    </div>
  );
}