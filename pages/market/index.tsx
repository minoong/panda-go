import Layout from '@components/layout';
import {NextPage} from 'next';
import React, {useMemo, useState} from 'react';
import {BehaviorSubject, combineLatestWith, map} from 'rxjs';
import List from '@mui/material/List';
import {useObservableState} from 'observable-hooks';
import {bookmark$, market$, deck$} from '@rxjs/store';
import {Box, TextField} from '@mui/material';
import MarketRow from '@components/market/main/MarketRow';
import Modal from '@components/commons/modal/Modal';
import useModal from '@hooks/useModal';

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
     width: 1,
     marginTop: '0.5rem',
    }}
   >
    <TextField sx={{width: 1}} label="market" value={search$.value} onChange={(e) => search$.next(e.target.value)} />
   </Box>

   <List sx={{width: '100%', bgcolor: 'background.paper'}}>
    {filteredSymbol.map((symbol) => (
     <MarketRow
      key={symbol.market}
      {...symbol}
      onChange={() => {
       if (bookmark$.value.includes(symbol.market)) {
        bookmark$.next(bookmark$.value.filter((market) => market !== symbol.market));
       } else {
        bookmark$.next([...bookmark$.value, symbol.market]);
       }
      }}
     />
    ))}
   </List>
  </>
 );
};

const Index: NextPage = () => {
 const {enableModal} = useModal();

 const onEnableModal = () => {
  enableModal({
   modalProps: {
    isOpen: true,
    children: <div>sdfsfd</div>,
   },
  });
 };

 return (
  <Layout hasTabBar title="마켓">
   <Search />
   <Deck />
   <button onClick={onEnableModal}>test!!</button>
  </Layout>
 );
};

export default Index;
