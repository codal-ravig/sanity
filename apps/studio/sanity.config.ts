import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { structure } from './structure/index';
import { defaultDocumentNode } from './structure/defaultDocumentNode';
import { media } from 'sanity-plugin-media';
import { fieldLevelExperiments } from '@sanity/personalization-plugin';

export default defineConfig({
  name: 'default',
  title: 'Day One Content Operations',

  projectId: 'bgkp6123',
  dataset: 'production',

  plugins: [structureTool({structure, defaultDocumentNode}), visionTool(), media(),fieldLevelExperiments({
      // field types that you want to be able to emperiment on
      fields: ['string'], 
      // hardcoded experiments and variants
      experiments: [
        {
          id: 'event-name',
          label: 'Event Name',
          variants: [
            {
              id: 'control',
              label: 'Control',
            },
            {
              id: 'variant',
              label: 'Variant',
            },
          ],
        },
      ],
     })],

  studio: {},

  schema: {
    types: schemaTypes,
  },
  tools: (prev, {currentUser}) => {
    const isAdmin = currentUser?.roles.some((role) => role.name === 'administrator')

    if (isAdmin) {
      return prev
    }

    return prev.filter((tool) => tool.name !== 'vision')
  },
})
