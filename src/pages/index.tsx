import { useState, useMemo } from 'react';
import Image from 'next/image';
import Loading from '../components/Loading';
import { FaSnowflake } from 'react-icons/fa';
import { Kaisei_Decol } from 'next/font/google';

const kaiseiDecol = Kaisei_Decol({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

const Home = () => {
  const [count, setCount] = useState<number | null>(null);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchArticleCount = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://sphk5k5en0.execute-api.us-east-1.amazonaws.com/default/qiita-2025adventcal-christmastree?user_id=${encodeURIComponent(userId)}`);
      const data = await response.json();
      setCount(data.count || 0);
    } catch (error) {
      console.error(error);
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  // 雪の設定をメモ化して、再レンダリング時に再生成されないようにする
  const snowflakeConfigs = useMemo(() => {
    return Array.from({ length: 50 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      fontSize: Math.random() * 10 + 10,
      animationDelay: Math.random() * 5,
      animationDuration: Math.random() * 5 + 5,
    }));
  }, []); // 空の依存配列で初回のみ生成

  const Snowflakes = () => {
    return (
      <>
        {snowflakeConfigs.map((config) => {
          const style = {
            left: `${config.left}vw`,
            fontSize: `${config.fontSize}px`,
            animationDelay: `${config.animationDelay}s`,
            animationDuration: `${config.animationDuration}s`,
          };
          return (
            <FaSnowflake key={config.id} className="snowflake" style={style} />
          );
        })}
      </>
    );
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-christmasGreen text-blue-300 ${kaiseiDecol.className}`}
    >
      <Snowflakes />
      <h1 className="text-6xl md:text-8xl font-bold mb-8 text-christmasRed flex items-center z-10">
        <FaSnowflake className="mr-4" />
        クリスマスツリー
        <FaSnowflake className="ml-4" />
      </h1>
      <div className="mb-8 z-10">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Qiita IDを入力"
          className="p-2 rounded border"
        />
        <button
          onClick={fetchArticleCount}
          className="ml-4 p-2 bg-christmasRed text-white rounded"
        >
          記事数を取得
        </button>
      </div>
      {loading && <Loading />}
      {count !== null && !loading && (
        <>
          <p className="text-2xl md:text-3xl mb-8 z-10">現在の記事数：{count} 件</p>
          <div className="w-full max-w-md md:max-w-lg lg:max-w-xl z-10">
            <Image
              src={`/svg/day_${Math.min(Math.max(count, 1), 25)}.svg`}
              alt={`Day ${Math.min(Math.max(count, 1), 25)} SVG`}
              width={400}
              height={500}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
