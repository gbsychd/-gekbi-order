-- Only restore execution permission for the existing customer-status RPC.
-- No tables, data, RLS policies, or function logic are changed.
GRANT EXECUTE
ON FUNCTION public.get_customer_order_status(bigint, text)
TO anon, authenticated;
