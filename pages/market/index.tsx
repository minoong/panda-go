import Layout from '@components/layout';
import {NextPage} from 'next';
import React, {useEffect, useMemo, useState} from 'react';
import {BehaviorSubject, combineLatestWith, map} from 'rxjs';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {useObservableState} from 'observable-hooks';
import Typography from '@mui/material/Typography';
import {bookmark$, CustomCandles, market$, deck$} from '@rxjs/store';
import {Box, Checkbox, TextField} from '@mui/material';

const Deck = () => {
 const deck = useObservableState(deck$, []);

 return (
  <div>
   <h4>Deck</h4>
   <div>
    {deck.map((market) => (
     <div key={market.market}>
      <div>{market.market}!!</div>
     </div>
    ))}
   </div>
  </div>
 );
};

const Search = () => {
 const search$ = useMemo(() => new BehaviorSubject(''), []);
 const markets = useObservableState(market$, []);
 const [filteredSymbol] = useObservableState(
  () =>
   market$.pipe(
    combineLatestWith(search$),
    map(([market, bookmark]) => market.filter((m) => m.market.toLowerCase().includes(bookmark.toLowerCase()))),
   ),
  [],
 );

 return (
  <>
   <Box
    sx={{
     display: 'flex',
     alignItems: 'center',
     '& > :not(style)': {m: 1},
    }}
   >
    <TextField id="demo-helper-text-misaligned-no-helper" label="Name" value={search$.value} onChange={(e) => search$.next(e.target.value)} />
   </Box>

   <List sx={{width: '100%', bgcolor: 'background.paper'}}>
    {filteredSymbol.map((symbol) => (
     <ListItem
      key={symbol.market}
      secondaryAction={
       <input
        type="checkbox"
        checked={symbol.isBookmark}
        onChange={() => {
         if (bookmark$.value.includes(symbol.market)) {
          bookmark$.next(bookmark$.value.filter((market) => market !== symbol.market));
         } else {
          bookmark$.next([...bookmark$.value, symbol.market]);
         }
        }}
       />
      }
      disablePadding
     >
      <ListItemButton>
       <ListItemAvatar>
        <Avatar alt={symbol.market} src={`/markets/${symbol.market.split('-')[1]}.png`} />
       </ListItemAvatar>
       <ListItemText id={symbol.market} primary={symbol.market} />
       <Typography variant="body2">
        <br />
        {symbol.signed_change_price}, {(symbol.signed_change_rate * 100).toFixed(2)}
       </Typography>
      </ListItemButton>
     </ListItem>
    ))}
   </List>
  </>
 );
};

const index: NextPage = () => {
 return (
  <Layout hasTabBar title="마켓">
   <Search />
   <Deck />
  </Layout>
 );
};

export default index;
