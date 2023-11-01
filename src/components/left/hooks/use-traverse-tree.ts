import { folder } from 'jszip';

const useTraverseTree = () => {
  const insertNode = (
    tree: any,
    folderId: number,
    item: string,
    isFolder: boolean,
    preview: string
  ) => {
    if (tree.id === folderId && tree.isFolder) {
      for (const files of tree.items) {
        if (files.name.toLowerCase() === item.toLowerCase()) {
          alert('Folder name already exists');
          return a();
        }

        if (tree.name.toLowerCase() === item.toLowerCase()) {
          alert(
            'A nested endpoint should not have the same name as its parent'
          );
          return a();
        }
      }

      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [
          {
            id: new Date().getTime(),
            name: 'page.tsx',
            isFolder: false,
            items: [],
          },
        ],
        preview: '',
      });
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((ob: object) => {
      return insertNode(ob, folderId, item, isFolder, preview);
    });

    return { ...tree, items: latestNode };
  };

  const deleteNode = (tree: any, folderId: number) => {
    const items = tree.items.filter((ob: any) => {
      return ob.id !== folderId;
    });

    if (items.length === tree.items.length) {
      const temp = tree.items.map((obj) => deleteNode(obj, folderId));
      return { ...tree, items: temp };
    }

    return { ...tree, items: items };
  };

  const createCustomEndpoint = (
    tree: any,
    folderId: number,
    item: string,
    isFolder: boolean
  ) => {
    let fileAlreadyExists = false;

    if (tree.name === 'app') {
      for (const files of tree.items) {
        if (files.name.toLowerCase() === item.toLowerCase()) {
          alert('Folder name already exists!');
          fileAlreadyExists = true;
          return laura();
        }
      }

      if (fileAlreadyExists === false) {
        tree.items.unshift({
          id: new Date().getTime(),
          name: item,
          isFolder: true,
          items: [
            {
              id: new Date().getTime(),
              name: 'page.tsx',
              isFolder: false,
              preview: `
                  import React from 'react';
                    
                    const Page = () => {
                      return (
                        <>
                          {/* Your page content goes here */}
                        </>
                      );
                    };
                    
                    export default Page;
                                `,
              items: [],
            },
          ],
        });
        return tree;
      }
    }

    let latestNode = [];
    latestNode = tree.items.map((ob: object) => {
      return createCustomEndpoint(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };
  // const retrieveCode =

  const insertBoilerFiles = (
    tree: any,
    folderId: number,
    item: string,
    folderName: string,
    preview: string,
    parent: string,
    tags: []
  ) => {
    if (tree.name === folderName) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        items: [],
        preview: preview,
        parent: folderName,
        tags: tags,
      });
      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob: object) => {
      return insertBoilerFiles(
        ob,
        folderId,
        item,
        folderName,
        preview,
        parent,
        tags
      );
    });

    return { ...tree, items: latestNode };
  };

  const updatePreview = (
    tree: any,
    preview: string,
    fileId: number,
    tags: []
  ) => {
    if (parent == tree.parent) {
      console.log('helloooo');
      console.log(tree);
    }

    if (fileId == tree.id) {
      // console.log('TAGS', tags);
      // console.log('TREE PREVIEW', tree.preview)
      // console.log('PASSED IN PREVIEW', preview)
      tree.preview = preview;
      tree.tags = tags;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob: object) => {
      return updatePreview(ob, fileId, preview, tags);
    });

    return { ...tree, items: latestNode };
  };

  const updateInitialPreview = (
    tree: any,
    folderName: string,
    fileName: string,
    preview: string,
    tags: []
  ) => {
    // console.log('PREVIEW', preview);
    // console.log('FILE', fileName);
    // console.log('name', folderName);

    if (folderName == tree.parent && fileName == tree.name) {
      console.log('found match');
      tree.preview = preview;
      console.log('UPDATE PREVIEW', tree.preview);
    }

    let latestNode = [];
    latestNode = tree.items.map((ob: object) => {
      return updateInitialPreview(ob, folderName, fileName, preview, tags);
    });

    return { ...tree, items: latestNode };
  };

  return {
    insertNode,
    deleteNode,
    createCustomEndpoint,
    insertBoilerFiles,
    updatePreview,
    updateInitialPreview,
  };
};

export default useTraverseTree;
