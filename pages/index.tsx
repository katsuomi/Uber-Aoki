import React, { FC, FormEvent, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { submitTaxiRequest } from './utils/slack';

const Home: FC = () => {
  const [name, setName] = useState<string>("");
  const [arrivalTime, setArrivalTime] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [thought, setThought] = useState<string>("");
  const isDisabled = name && arrivalTime && place && phoneNumber && thought ? false : true;

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data: any = {
      name: name,
      arrivalTime: arrivalTime,
      place: place,
      phoneNumber: phoneNumber,
      thought: thought,
    };
    const response = await submitTaxiRequest(data);
    if(response.success) {
      alert('依頼を送りました');
      setName("");
      setArrivalTime("");
      setPlace("");
      setPhoneNumber("");
      setThought("");
    } else {
      alert('依頼に失敗しました');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Uber Aoki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <img src="/images/logo.png" alt="logo" className={styles.logo} />
        </h1>
        <section>
          <h5>青木の気分次第で、あなたを送迎するかもしれません。</h5>
          <ul>
            <li>名古屋市内に限ります</li>
            <li>送迎可能な場合、送迎時間の20分前までに連絡が来ます</li>
            <li>送迎時間の20分前までに連絡が来ない場合、残念。迎えに来ません。</li>
          </ul>
        </section>
        <section>
          <form className={styles.form}>
            <span>迎えに来て欲しい場所(住所)<span className={styles.requiredBadge}>必須</span></span>
            <input required className={styles.input} value={place} onChange={e => setPlace(e.target.value)} />
            <span>迎えに来て欲しい時間<span className={styles.requiredBadge}>必須</span></span>
            <input required className={styles.input} value={arrivalTime} onChange={e => setArrivalTime(e.target.value)} />
            <span>名前<span className={styles.requiredBadge}>必須</span></span>
            <input required className={styles.input} value={name} onChange={e => setName(e.target.value)} />
            <span>連絡先(電話番号)<span className={styles.requiredBadge}>必須</span></span>
            <input required className={styles.input} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
            <span>あなたの想いをどうぞ<span className={styles.requiredBadge}>必須</span></span>
            <textarea required rows={10} className={styles.textArea} value={thought} onChange={e => setThought(e.target.value)} />
            <button onClick={handleOnSubmit} className={styles.submit} disabled={isDisabled}>依頼する</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Home;
