import withHandler, {ResponseType} from '@libs/server/withHandler';
import {withApiSession} from '@libs/server/withSession';
import {NextApiRequest, NextApiResponse} from 'next';
import client from '@libs/server/client';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
 if (req.method !== 'GET') res.json({ok: false});

 const profile = await client.user.findUnique({
  where: {id: req.session.user?.id},
 });

 res.json({
  ok: true,
  profile,
 });
}

export default withApiSession(
 withHandler({
  methods: ['GET', 'POST'],
  handler,
 }),
);
