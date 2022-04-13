import Layout from '@components/layout';
import {NextPage} from 'next';
import React, {useEffect, useMemo, useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {CustomCandles, upbitWithLmw$} from '@rxjs/store';
import {Subscription} from 'rxjs';
import {Box, TextField} from '@mui/material';

const Stock = () => {
 useEffect(() => {
  const subscription = upbitWithLmw$.subscribe(console.log);

  return () => subscription.unsubscribe();
 }, []);

 return <div>hi</div>;
};

const Search = () => {
 const [search, setSearch] = useState('');
 const [symbol, setSymbol] = useState<CustomCandles[]>([]);
 useEffect(() => {
  console.log('12312');
  const subscription = upbitWithLmw$.subscribe(setSymbol);

  return () => subscription.unsubscribe();
 }, []);

 const filteredSymbol = useMemo(() => symbol.filter((s) => s.market.toUpperCase().includes(search.toUpperCase())), [search, symbol]);
 return (
  <>
   <Box
    sx={{
     display: 'flex',
     alignItems: 'center',
     '& > :not(style)': {m: 1},
    }}
   >
    <TextField id="demo-helper-text-misaligned-no-helper" label="Name" onChange={(e) => setSearch(e.target.value)} />
   </Box>
   {filteredSymbol.map((symbol) => (
    <div key={symbol.market}>{symbol.market}</div>
   ))}
  </>
 );
};

const index: NextPage = () => {
 return (
  <Layout hasTabBar title="마켓">
   <Search />
   <Stock />
   <List sx={{width: '100%', bgcolor: 'background.paper'}}>
    <ListItem alignItems="flex-start">
     <ListItemAvatar>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
     </ListItemAvatar>
     <ListItemText
      primary="Brunch this weekend?"
      secondary={
       <React.Fragment>
        <Typography sx={{display: 'inline'}} component="span" variant="body2" color="text.primary">
         Ali Connors
        </Typography>
        {" — I'll be in your neighborhood doing errands this…"}
       </React.Fragment>
      }
     />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem alignItems="flex-start">
     <ListItemAvatar>
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
     </ListItemAvatar>
     <ListItemText
      primary="Summer BBQ"
      secondary={
       <React.Fragment>
        <Typography sx={{display: 'inline'}} component="span" variant="body2" color="text.primary">
         to Scott, Alex, Jennifer
        </Typography>
        {" — Wish I could come, but I'm out of town this…"}
       </React.Fragment>
      }
     />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem alignItems="flex-start">
     <ListItemAvatar>
      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
     </ListItemAvatar>
     <ListItemText
      primary="Oui Oui"
      secondary={
       <React.Fragment>
        <Typography sx={{display: 'inline'}} component="span" variant="body2" color="text.primary">
         Sandra Adams
        </Typography>
        {' — Do you have Paris recommendations? Have you ever…'}
       </React.Fragment>
      }
     />
    </ListItem>
   </List>
  </Layout>
 );
};

export default index;
