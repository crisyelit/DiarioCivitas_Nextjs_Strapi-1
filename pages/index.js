import React, { useEffect, useState } from "react";
import { api } from "../api";
import GridNews from "../components/GridNews.js";
import PopularPost from "../components/home/PopularPost.js";
import SocialLinks from "../components/home/SocialLinks.js";
import Suscribed from "../components/home/Suscribed.js";
import PanelPrimary from "../components/PanelPrimary.js";
import CategoryBlock from "../components/CategoryBlock.js";
import EditorPicks from "../components/EditorPicks.js";
import Image from "next/image";
import Head from 'next/head'

const Home = (props) => {
  console.log(props)
  return (
    <>
    <Head>
    <meta name="description" content={"El periodico digital más grande de Murcia, Lorca, Alicante y Puerto Lumbreras | Noticias más destacadas del acontecer local, regional y nacional"} />
    </Head>
    <section className="max-w-screen-lg mx-auto inset-x-0 md:py-8 flex flex-col gap-10 px-5 bg-white">
      <h1 className="hidden">Diario Civitas</h1>
      {/* <HeaderNews titulos={noticias?.map((noticia) => noticia.titulo)} /> */}
      <PanelPrimary noticias={props?.ultimasNoticias} />
      <div className="w-full grid md:grid-cols-3 gap-10">
        <GridNews noticias={props?.categorias} />
        <PanelSidebar noticiasOpinion={props?.categorias} />
      </div>
      <div className="w-full h-max py-6 block">
        <Image
          src="/ad.png"
          objectFit={"contain"}
          height={10}
          width={"100vw"}
          layout={"responsive"}
        />
      </div>
      <EditorPicks noticias={props?.ultimasNoticias} />
      <div className="hidden md:grid grid-cols-2 gap-10 -mt-10">
        <CategoryBlock
          title={"Murcia"}
          noticias={props?.categorias["Locales Murcia"]}
        />
        <CategoryBlock
          title={"Puerto Lumbreras"}
          noticias={props?.categorias["Locales Puerto Lumbreras"]}
        />
        <CategoryBlock
          title={"Lorca"}
          noticias={props?.categorias["Locales Lorca"]}
        />
        <CategoryBlock title={"Pulpí"} noticias={props?.categorias?.Pulpí} />
      </div>
    </section>
    </>
  );
};

export default Home;

export const PanelSidebar = ({ noticiasOpinion }) => {
  return (
    <div className="hidden md:flex w-full h-full flex-col items-center gap-10 ">
      <PopularPost noticias={noticiasOpinion} />
      <Suscribed />
      <SocialLinks />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { data } = await api.FetchHome();
    return {
      props: {
        ultimasNoticias: data?.lastPost?.quinceUltimosPost,
        categorias: data?.lastPost?.ultimosPost,
      },
    };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
}
