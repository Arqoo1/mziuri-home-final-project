import Coupon from '../models/Coupon.js';

export const validateCoupon = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Coupon code is required' });
  }

  try {
    console.log('Searching for coupon code (case-insensitive):', code);

    // Case-insensitive search using regex
    const coupon = await Coupon.findOne({ code: { $regex: `^${code}$`, $options: 'i' } });

    console.log('Coupon found:', coupon);

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    if (!coupon.isActive) {
      return res.status(400).json({ error: 'Coupon is not active' });
    }

    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      return res.status(400).json({ error: 'Coupon has expired' });
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ error: 'Coupon usage limit reached' });
    }

    return res.status(200).json({
      message: 'Coupon is valid',
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      description: coupon.description,
    });

  } catch (error) {
    console.error('Coupon validation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
