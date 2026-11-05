A test that passes forty-nine times and fails once is easy to shrug off.
Rerun it, watch it go green, move on.
But that one failure is real information: something in the system is not deterministic, and the test just happened to notice.

## Where flakiness comes from

Most flaky tests come from one of three places:

1. **Timing.** The test waits a fixed amount of time instead of waiting for a condition.
2. **Shared state.** One test leaves something behind that another test trips over.
3. **Ordering.** The code assumes a set, a map, or a query returns things in a stable order.

The first one is the most common, and the easiest to fix.

```python
# Flaky: assumes the job finishes within one second
start_job()
time.sleep(1)
assert job_status() == "done"


# Steady: waits for the condition, with a deadline
def wait_until(check, timeout=10.0, interval=0.05):
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if check():
            return
        time.sleep(interval)
    raise TimeoutError("condition was never met")


start_job()
wait_until(lambda: job_status() == "done")
```

## Treat it like any other bug

The hard part of a flaky test is that it refuses to fail when you are watching.
So the first step is to make it fail on demand: run it in a loop until it breaks, then shrink the loop until you know what it takes.
With `pytest-repeat`, that is one line:

```bash
pytest tests/test_jobs.py -x --count=200
```

Once it fails reliably, it is not a flaky test anymore.
It is just a bug, and bugs get fixed.
