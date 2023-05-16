import Campaign from "../../PagesComponents/Campaign";
import api from "../../services/api";
import apiUnlogged from "../../services/apiUnlogged";

export default function CampaignPage({ content }) {
  return <Campaign content={content} />;
}

export async function getServerSideProps(ctx) {
  const { name } = ctx.params;

  let content = [];
  try {
    const response = await apiUnlogged.get(
      `/cms2/${name[0]}?page_products=${1}&search=${""}`
    );
    content = response.data;
  } catch (e) {
    return { redirect: { destination: "/404", permanent: false } };
  }

  const title = content.data[0].meta_title;
  const metaKeywords = content.data[0].meta_keywords;
  const metaDescription = content.data[0].meta_description;
  const metaKdt = `${process.env.NEXT_PUBLIC_REACT_APP_NAME} - Campanha`;

  return {
    props: {
      seo: {
        title,
        metaDescription,
        metaKdt,
        metaKeywords,
      },
      content,
    },
  };
}
