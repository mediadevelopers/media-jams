import { useDocumentOperation, useEditState } from '@sanity/react-hooks';

export function useWorkflowMetadata(id, { state, init }) {
  const editState = useEditState(
    `workflow-metadata.${id}`,
    'workflow.metadata',
  );
  const ops = useDocumentOperation(
    `workflow-metadata.${id}`,
    'workflow.metadata',
  );

  const data =
    editState && editState.published
      ? editState.published
      : {
          _id: `workflow-metadata.${id}`,
          _type: 'workflow.metadata',
          state: state,
          initial: init,
        };

  return {
    clearAssignees,
    commit,
    data,
    delete: deleteMetadata,
    setAssignees,
    setState,
  };

  function clearAssignees() {
    ops.patch.execute([
      { setIfMissing: { documentId: id } },
      { unset: ['assignees'] },
    ]);
  }

  function commit() {
    ops.commit.execute();
  }

  function deleteMetadata() {
    ops.delete.execute();
  }

  function setAssignees(assignees) {
    ops.patch.execute([
      { setIfMissing: { documentId: id } },
      { set: { assignees } },
    ]);
  }

  function setRoles(roles) {
    ops.patch.execute([
      { setIfMissing: { documentId: id } },
      { set: { roles } },
    ]);
  }

  async function setState(state) {
    console.log('setState', state);
    ops.patch.execute([
      { setIfMissing: { documentId: id } },
      { setIfMissing: { inital: state === 'inReview' } },
      { set: { state } },
    ]);
  }
}
