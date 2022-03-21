import withHandler, {ResponseType} from '@libs/server/withHandler';
import {NextApiRequest, NextApiResponse} from 'next';
import client from '@libs/server/client';
import {withApiSession} from '@libs/server/withSession';

const toConvert = (value: string | string[]) => parseFloat(value.toString());

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
 if (req.method === 'GET') {
  const {
   query: {latitude, longitude, pageIndex},
  } = req;

  console.log(latitude, longitude, pageIndex);

  client.$queryRaw`SET SESSION sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';`.then(
   async () => {
    const posts = await client.post.findMany({
     include: {
      user: {
       select: {
        id: true,
        name: true,
        avatar: true,
       },
      },
      _count: {
       select: {
        wondering: true,
        answers: true,
       },
      },
     },
     ...(latitude && {
      where: {
       latitude: {
        gte: toConvert(latitude.toString()) - 0.01,
        lte: toConvert(latitude.toString()) + 0.01,
       },
       longitude: {
        gte: toConvert(longitude.toString()) - 0.01,
        lte: toConvert(longitude.toString()) + 0.01,
       },
      },
     }),
     skip: +pageIndex,
     take: 1,
     orderBy: {
      createdAt: 'desc',
     },
    });
    res.json({
     ok: true,
     posts,
    });
   },
  );
 }
}

export default withApiSession(
 withHandler({
  methods: ['GET', 'POST'],
  handler,
 }),
);
