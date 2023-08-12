import express from 'express';
import { Testset } from '../../models/testSet';
import requireAuth from '../../middleware/auth';

const router = express();

router.get('/one/:id', requireAuth, async (req, res) => {
  const documentId = req.params.id;
  Testset.findById(documentId)
    .then((foundDocument) => {
      if (foundDocument) {
        return res.status(200).json(foundDocument);
      } else {
        return res.status(404).json({ error: 'Document not found' });
      }
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ error: 'An error occurred while finding the document' });
    });
});

router.get('/many', requireAuth, async (req, res) => {
  try {
    // get the company ID from JWT and then search for the company ID -> TestSet array(IDs) -> return all TestSet from those ID
    const body = req.body;
    const documents = await Testset.find(body);

    return res.status(200).json(documents);
  } catch (err) {
    console.error('Error retrieving documents:', err);
    return res.status(500).json({
      error: 'An error occured while retrieving documents',
    });
  }
});
export { router as getTestset };
