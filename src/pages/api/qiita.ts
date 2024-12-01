import type { NextApiRequest, NextApiResponse } from 'next'

type QiitaArticle = {
  id: string;
  title: string;
  user: {
    id: string;
    name: string;
  };
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user_id } = req.query;

    if (!user_id || typeof user_id !== 'string') {
      return res.status(400).json({
        count: 0,
        message: 'user_id is required'
      });
    }

    const perPage = 100;
    const page = 1;
    let totalCount = 0;
    let userArticles: QiitaArticle[] = [];

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.QIITA_ACCESS_TOKEN}`,
    };

    // クエリを構築 - ユーザーIDと日付範囲を追加
    const query = `user:${user_id} created:>=2024-10-25 created:<=2024-12-15`;

    const response = await fetch(
      `https://qiita.com/api/v2/items?page=${page}&per_page=${perPage}&query=${encodeURIComponent(query)}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data from Qiita API');
    }

    const data: QiitaArticle[] = await response.json();

    userArticles = data;
    totalCount = data.length;

    res.status(200).json({
      count: totalCount,
      articles: userArticles.map(article => ({
        id: article.id,
        title: article.title,
        userId: article.user.id,
        userName: article.user.name
      }))
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      count: 0,
      message: 'Internal Server Error'
    });
  }
};

export default handler;
