import React from 'react';
import Layout from '@components/Layout';
import { useMixPanel } from '@lib/mixpanel';
import Iframe from '@components/Iframe';

export default function Feedback() {
  return (
    <>
      <Iframe
        class="airtable-embed"
        src="https://airtable.com/embed/shrT2aebulK2xeUJ2?backgroundColor=orange"
        frameborder="0"
        onmousewheel=""
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          border: '1px solid #ccc',
        }}
      ></Iframe>
    </>
  );
}

Feedback.getLayout = (page) => <Layout>{page}</Layout>;
