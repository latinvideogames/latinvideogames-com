import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Link,
  CardMedia,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton
} from '@mui/material'
import gamesData from './data/gamesData.json' // Assuming your JSON data is stored in gamesData.json
import styled from '@emotion/styled'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import useColumnCount from './useColumnCount'

const StyledActionButton = styled(Button)`
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const GameList = ({ cols, games }) => {
  if (!games) return null

  const getSubtitle = game => {
    const arr = []

    console.log('')

    if (game.hasMultiplayer) arr.push('Multiplayer')
    if (game.hasVRSupport) arr.push('VR')
    if (game.notes) arr.push(game.notes)

    return (
      <>
        {game.platform}
        <br />
        {arr.join(' | ')}
      </>
    )
  }

  return (
    <ImageList cols={cols}>
      {games.map(game => (
        <ImageListItem
          key={game.imageURL}
          cols={game.cols ?? 1}
          rows={game.rows ?? 1}
        >
          <img
            srcSet={`${game.imageURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${game.imageURL}?w=248&fit=crop&auto=format`}
            alt={game.videoGame}
            loading='lazy'
          />
          <ImageListItemBar
            sx={{
              background: 'transparent'
            }}
            // title={game.videoGame}
            position='bottom'
            actionIcon={
              <div>
                {game.installURL && (
                  <StyledActionButton
                    size='small'
                    sx={{ color: 'white' }}
                    color={game.platform === 'Web' ? 'secondary' : 'primary'}
                    variant='contained'
                    href={game.installURL}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {game.platform === 'Web' ? 'Play' : 'Download'}
                  </StyledActionButton>
                )}
                {game.demoURL && (
                  <StyledActionButton
                    size='small'
                    sx={{ color: 'white' }}
                    color='secondary'
                    variant='contained'
                    href={game.demoURL}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Demo
                  </StyledActionButton>
                )}

                {game.subtitlesURL && (
                  <StyledActionButton
                    size='small'
                    sx={{ color: 'white' }}
                    color='success'
                    variant='contained'
                    href={game.subtitlesURL}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Download Subtitles
                  </StyledActionButton>
                )}

                {game.dtInstallURL && (
                  <StyledActionButton
                    size='small'
                    sx={{ color: 'white' }}
                    color='success'
                    variant='contained'
                    href={game.dtInstallURL}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Download DT's Translation
                  </StyledActionButton>
                )}

                {game.buyURL && (
                  <StyledActionButton
                    size='small'
                    sx={{ color: 'white' }}
                    color='primary'
                    href={game.buyURL}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Buy
                  </StyledActionButton>
                )}
                {game.contributeURL && (
                  <StyledActionButton
                    size='small'
                    sx={{ color: 'white' }}
                    color='primary'
                    href={game.contributeURL}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Contribute
                  </StyledActionButton>
                )}
              </div>
            }
            actionPosition='right'
          />
          <ImageListItemBar
            title={game.videoGame}
            subtitle={<span>{getSubtitle(game)}</span>}
            position='top'
          />
          {/* <ImageListItemBar
            title={item.videoGame}
            subtitle={<span>by: {item.author}</span>}
            position="below"
          /> */}
        </ImageListItem>
      ))}
    </ImageList>
  )
}

function App () {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredGames, setFilteredGames] = useState(gamesData)
  const cols = useColumnCount()

  const handleSearch = event => {
    setSearchTerm(event.target.value)
    if (event.target.value === '') {
      setFilteredGames(gamesData)
    } else {
      const filteredData = gamesData.filter(game =>
        game.videoGame.toLowerCase().includes(event.target.value.toLowerCase())
      )
      setFilteredGames(filteredData)
    }
  }

  // Default
  const defaultLatinGames = filteredGames.filter(
    game => !game.isInDevelopment && !game.isPartialLatin && !game.isROM
  )
  const partialLatinGames = filteredGames.filter(game => game.isPartialLatin)
  const romGames = filteredGames.filter(game => game.isROM)
  const inDevelopmentGames = filteredGames.filter(game => game.isInDevelopment)
  // const partialLatinGames = filteredGames.filter(game => game.isPartialLatin);

  // Educational
  // Partial Latin
  // ROM
  // With legality disclaimer
  // In development

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ flexGrow: 1 }}>
        <CssBaseline />
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' style={{ flexGrow: 1 }}>
              Latin Video Games
            </Typography>
            <Link
              href='https://discord.gg/ludus'
              color='inherit'
              style={{ textDecoration: 'none' }}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button color='secondary' variant='contained'>
                Join the Discord
              </Button>
            </Link>
            {/* <Button color='inherit'>Patreon</Button> */}
          </Toolbar>
        </AppBar>

        {/* <Typography
        variant='h2'
        style={{
          flexGrow: 1,
          textAlign: 'center',
          marginTop: '2rem',
          marginBottom: '0rem'
        }}
      >
        Latin Video Games
      </Typography> */}

        <Typography
          variant='h3'
          style={{
            flexGrow: 1,
            textAlign: 'center',
            marginTop: '2rem'
            // marginBottom: '0rem'
          }}
        >
          Salvē!
        </Typography>
        <Typography
          variant='h6'
          style={{
            flexGrow: 1,
            textAlign: 'center',
            marginTop: '2rem'
            // marginBottom: '0rem'
          }}
        >
          This website lists all of the video games I've found online.
          <br />
        </Typography>
        <Typography
          variant='h6'
          color='secondary'
          style={{
            flexGrow: 1,
            textAlign: 'center',
            marginBottom: '1rem'
          }}
        >
          Disclaimer: These games were not translated by me,<br/> and I claim no
          ownership to them. - Quintus
        </Typography>
        <Typography
          variant='h5'
          style={{
            flexGrow: 1,
            textAlign: 'center'
            // marginBottom: '0rem'
          }}
        >
          Want to play a multiplayer latin game?
        </Typography>
        <Typography
          variant='h6'
          style={{
            flexGrow: 1,
            textAlign: 'center'
            // marginBottom: '0rem'
          }}
        >
          Consider&nbsp;
          <Link
            href='https://discord.gg/ludus'
            color='secondary'
            style={{ textDecoration: 'none' }}
            target='_blank'
            rel='noopener noreferrer'
          >
            joining the discord
          </Link>
          &nbsp;and looking for players. 🎮
        </Typography>

        <Grid container justifyContent='center'>
          <TextField
            label='Search games'
            variant='outlined'
            style={{ margin: 20, minWidth: '20rem' }}
            value={searchTerm}
            onChange={handleSearch}
          />
        </Grid>

        <GameList games={defaultLatinGames} cols={cols} />

        {partialLatinGames.length > 0 && (
          <>
            <Typography
              variant='h4'
              color="secondary"
              style={{
                flexGrow: 1,
                textAlign: 'center',
                marginTop: '2rem',
                marginBottom: '0rem'
              }}
            >
              Partial Latin games
            </Typography>
            <Typography
              variant='h6'
              style={{
                flexGrow: 1,
                textAlign: 'center',
                // marginTop: '2rem',
                marginBottom: '0rem'
              }}
            >
              English games that also contain Latin
            </Typography>

            <GameList games={partialLatinGames} cols={cols} />
          </>
        )}


      {romGames.length > 0 && (
          <>
            <Typography
              variant='h4'
              color="primary"
              style={{
                flexGrow: 1,
                textAlign: 'center',
                marginTop: '2rem',
              }}
            >
              Latin ROMs
            </Typography>
            <Typography
              variant='h6'
              style={{
                flexGrow: 1,
                textAlign: 'center',
                // marginTop: '2rem',
                marginBottom: '0rem'
              }}
            >
              <b>Disclaimer:</b> Links to these games will not be provided,<br/>since the legality and distribution of ROMs is questionable.
            </Typography>

            <GameList games={romGames} cols={cols} />
          </>
        )}

        {inDevelopmentGames.length > 0 && (
          <>
            <Typography
              variant='h4'
              color="secondary"
              style={{
                flexGrow: 1,
                textAlign: 'center',
                marginTop: '2rem',
                marginBottom: '0rem'
              }}
            >
              Latin Games (in development)
            </Typography>
            <Typography
              variant='h6'
              style={{
                flexGrow: 1,
                textAlign: 'center',
                // marginTop: '2rem',
                marginBottom: '0rem'
              }}
            >
              Some with quality issues.
            </Typography>

            <GameList games={inDevelopmentGames} cols={cols} />
          </>
        )}

            <Typography
              variant='h4'
              color="primary"
              style={{
                flexGrow: 1,
                textAlign: 'center',
                marginTop: '2rem',
                marginBottom: '0rem'
              }}
            >
              Do you know a latin game we're missing?
            </Typography>
            <Typography
              variant='h6'
              style={{
                flexGrow: 1,
                textAlign: 'center',
                // marginTop: '2rem',
                marginBottom: '3rem'
              }}
            >
              Please share it <Link
            href='https://discord.gg/ludus'
            color='secondary'
            style={{ textDecoration: 'none' }}
            target='_blank'
            rel='noopener noreferrer'
          >
            on the discord 🙏
          </Link>
            </Typography>
      </div>
    </ThemeProvider>
  )
}

export default App
